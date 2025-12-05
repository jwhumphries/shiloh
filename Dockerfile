FROM ghcr.io/jwhumphries/tailwindcss:latest AS tailwind
FROM golang:1.25-alpine AS gorun
FROM ghcr.io/gohugoio/hugo:latest AS hugo
FROM oven/bun:alpine AS bun

# This stage requires the project directory to be mounted to /blog
FROM oven/bun:alpine AS develop
WORKDIR /workdir
RUN apk add --no-cache \
    libc6-compat \
    git
COPY --from=gorun /usr/local/go /usr/local/go
ENV PATH="/usr/local/go/bin:${PATH}"
COPY --from=hugo /usr/bin/hugo /usr/local/bin/hugo
COPY --from=tailwind /usr/local/bin/tailwindcss /usr/local/bin/
EXPOSE 1313
COPY scripts/docker/develop.sh /develop.sh
RUN [ "chmod", "+x", "/develop.sh"]
ENTRYPOINT ["/develop.sh"]
CMD ["/workdir"]
