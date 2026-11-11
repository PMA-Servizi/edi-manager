FROM nginx:1.27-alpine

RUN apk add --no-cache apache2-utils

COPY ./htpasswd.sh /docker-entrypoint.d/htpasswd.sh

RUN chmod +x /docker-entrypoint.d/htpasswd.sh