FROM golang:1.25-alpine@sha256:e6898559d553d81b245eb8eadafcb3ca38ef320a9e26674df59d4f07a4fd0b07 AS gorun
FROM ghcr.io/gohugoio/hugo:latest@sha256:53dc48ef4d550835b0e54b0f6b41e22e5160e27065d0691b220a713218eb059d AS hugo

FROM ghcr.io/jwhumphries/frontend:latest@sha256:682cee3e8392ecaf2e6bfdf2d4f6886e95a3fdea7efe06398d924a50e9017690 AS frontend
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
COPY package.json .
RUN bun install
COPY assets ./assets
COPY layouts ./layouts
RUN bun run build

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
