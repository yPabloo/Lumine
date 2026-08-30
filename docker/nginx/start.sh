#!/bin/sh
set -eu

htpasswd -bc /etc/nginx/.htpasswd "$ADMIN_USER" "$ADMIN_PASSWORD"
exec /docker-entrypoint.sh nginx -g 'daemon off;'
