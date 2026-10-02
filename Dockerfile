FROM caddy:2-alpine

WORKDIR /srv

COPY Caddyfile /etc/caddy/Caddyfile
COPY index.html /srv/index.html
COPY css /srv/css
COPY js /srv/js
COPY assets /srv/assets

EXPOSE 3000

