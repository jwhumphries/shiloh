FROM ghcr.io/jwhumphries/tailwindcss:latest AS tailwind
FROM golang:1.25-alpine AS gorun
FROM ghcr.io/gohugoio/hugo:latest AS hugo
FROM oven/bun:alpine AS bun

FROM bun AS frontend
ARG THEME_NAME=shiloh
ENV THEME_NAME=${THEME_NAME}
WORKDIR /${THEME_NAME}
COPY --from=tailwind /usr/local/bin/tailwindcss /usr/local/bin/

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
COPY --from=builder /release/assets/css/compiled /release/assets/css/compiled
WORKDIR /${THEME_NAME}
COPY --chmod=755 scripts/docker/docs.sh /docs.sh
ENTRYPOINT ["/docs.sh"]
