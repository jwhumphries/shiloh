FROM ghcr.io/gohugoio/hugo:latest@sha256:cef5b132b220dd5a661787d410124afe807b0ed3a79829604bdf0c3eefb85488 AS hugo

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
