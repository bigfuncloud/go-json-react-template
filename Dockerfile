FROM debian:buster-slim

RUN apt-get update && apt-get install -y ca-certificates

COPY --from=bigfuncloud/helpers:latest /biginit /usr/bin
COPY --from=caddy:2.4.1 /usr/bin/caddy /usr/bin
ADD Caddyfile /etc/caddy/Caddyfile

WORKDIR /app
COPY out/ /app/out/

CMD ["biginit", "caddy", "./out/app"]
