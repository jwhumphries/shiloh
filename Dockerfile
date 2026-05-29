FROM ghcr.io/gohugoio/hugo:latest@sha256:31afb889009554709eaaef938033442e884a7f4746a4a0d9b81c4a6919d76037 AS hugo

ARG THEME_NAME=shiloh
ENV THEME_NAME=${THEME_NAME}
WORKDIR /${THEME_NAME}

FROM hugo AS dev
EXPOSE 1313
COPY --chmod=755 scripts/docker/dev.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

FROM hugo AS release
COPY --chmod=755 scripts/docker/release.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

FROM hugo AS docs
COPY --chmod=755 scripts/docker/docs.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
