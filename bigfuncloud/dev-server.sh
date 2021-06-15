#!/bin/sh

set -ex

./bigfuncloud/dev-setup.sh

mkdir -p ./out/static
cp frontend/index.html out/static/

reflex -g "frontend/**/*" -s -- sh -c "npm run build && invalidate-devserver" &
reflex -g "api/**/*" -s -- sh -c "go run ./api && invalidate-devserver" &
reflex -g "Caddyfile" -s -- sh -c "caddy run && invalidate-devserver"
