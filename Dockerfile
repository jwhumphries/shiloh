FROM ghcr.io/gohugoio/hugo:latest@sha256:f8671f2299e60154536c158bff8ce27f6eef4dddbbfc73bcce66263276ae0f80 AS hugo

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
