#!/bin/bash

set -ex

sd "@BFC_APP_DOMAIN@" "$BFC_APP_DOMAIN" go.mod
sd "@BFC_APP_DOMAIN@" "$BFC_APP_DOMAIN" package.json
sd "@BFC_APP_DOMAIN@" "$BFC_APP_DOMAIN" ./api/friends.go 
sd "@BFC_APP_DOMAIN@" "$BFC_APP_DOMAIN" ./api/main.go 
sd "@BFC_APP_DOMAIN@" "$BFC_APP_DOMAIN" ./frontend/index.html 
