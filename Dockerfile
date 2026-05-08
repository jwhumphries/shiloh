FROM ghcr.io/jwhumphries/tailwindcss:latest@sha256:f7a61f3a483693b20d19119c516bbf75af3e45edd7662f6bbd601e363adcecef AS tailwind
FROM ghcr.io/gohugoio/hugo:latest@sha256:b4f4cd51ce64c7257bf103ecf8fb14f37ea7ca1980bcaaf516cdf95b14446fd7 AS hugo

ARG THEME_NAME=shiloh
ENV THEME_NAME=${THEME_NAME}
COPY --from=tailwind /usr/local/bin/tailwindcss /usr/local/bin/
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
