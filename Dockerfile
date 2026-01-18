FROM ghcr.io/jwhumphries/tailwindcss:latest@sha256:a4fdf32e156f84f0221a77b2c5afc2448a6b143b088df5e2d3e3fa6ac31f4656 AS tailwind
FROM ghcr.io/gohugoio/hugo:latest@sha256:53dc48ef4d550835b0e54b0f6b41e22e5160e27065d0691b220a713218eb059d AS hugo

ARG THEME_NAME=shiloh
ENV THEME_NAME=${THEME_NAME}
COPY --from=tailwind /usr/local/bin/tailwindcss /usr/local/bin/
WORKDIR /${THEME_NAME}

# Development target - runs Hugo dev server with live reload
# Requires project directory to be mounted to /${THEME_NAME}
FROM hugo AS dev
RUN apk add --no-cache libc6-compat git
EXPOSE 1313
COPY --chmod=755 scripts/docker/dev.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

# Release target - updates package.json with Hugo module dependencies
# Requires project directory to be mounted to /${THEME_NAME}
FROM hugo AS release
COPY --chmod=755 scripts/docker/release.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

# Docs target - builds the documentation site
# Requires project directory to be mounted to /${THEME_NAME}
FROM hugo AS docs
COPY --chmod=755 scripts/docker/docs.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
