FROM ghcr.io/gohugoio/hugo:latest@sha256:b4f4cd51ce64c7257bf103ecf8fb14f37ea7ca1980bcaaf516cdf95b14446fd7 AS hugo

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
