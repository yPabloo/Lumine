FROM nginx:1.27-alpine
RUN apk add --no-cache apache2-utils
COPY default.conf.template /etc/nginx/templates/default.conf.template
COPY start.sh /usr/local/bin/start-lumine-nginx
RUN chmod +x /usr/local/bin/start-lumine-nginx
ENTRYPOINT ["/usr/local/bin/start-lumine-nginx"]
