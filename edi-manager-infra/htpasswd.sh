set -e
: "${BASIC_AUTH_USER:?BASIC_AUTH_USER non impostata}"
: "${BASIC_AUTH_PASSWORD:?BASIC_AUTH_PASSWORD non impostata}"
htpasswd -bc /etc/nginx/.htpasswd "$BASIC_AUTH_USER" "$BASIC_AUTH_PASSWORD"