FROM golang:1.25-alpine@sha256:ac09a5f469f307e5da71e766b0bd59c9c49ea460a528cc3e6686513d64a6f1fb AS gorun
FROM ghcr.io/gohugoio/hugo:latest@sha256:ebffb1654ef0bc1cc96611ed11f6b5e142c90dc4d384e7716a6b31f20ae0e2fb AS hugo

FROM ghcr.io/jwhumphries/frontend:latest@sha256:d3720e6781c3139393de5b8e68fd23249314fe14138e1820d8ab51acdeafbb02 AS frontend
ARG THEME_NAME=shiloh
ENV THEME_NAME=${THEME_NAME}
WORKDIR /${THEME_NAME}

# This stage requires the project directory to be mounted to /${THEME_NAME}
FROM frontend AS develop
RUN apk add --no-cache \
    libc6-compat \
    git
COPY --from=gorun /usr/local/go /usr/local/go
ENV PATH="/usr/local/go/bin:${PATH}"
COPY --from=hugo /usr/bin/hugo /usr/local/bin/hugo
EXPOSE 1313
COPY --chmod=755 scripts/docker/develop.sh /develop.sh
ENTRYPOINT ["/develop.sh"]

FROM frontend AS builder
WORKDIR /release
COPY assets ./assets
COPY layouts ./layouts
COPY package.json .
RUN bun install \
    && bun run build

# This stage requires the project directory to be mounted to /${THEME_NAME}
FROM builder AS releaser
ARG THEME_NAME=shiloh
ENV THEME_NAME=${THEME_NAME}
WORKDIR /${THEME_NAME}
COPY --chmod=755 scripts/docker/release.sh /release.sh
ENTRYPOINT ["/release.sh"]

# This stage requires the project directory to be mounted to /${THEME_NAME}
FROM hugo AS docs
ARG THEME_NAME=shiloh
ENV THEME_NAME=${THEME_NAME}
USER root:root
COPY --from=builder /release/assets/css/compiled /release/assets/css/compiled
WORKDIR /${THEME_NAME}
COPY --chmod=755 scripts/docker/docs.sh /docs.sh
ENTRYPOINT ["/docs.sh"]
