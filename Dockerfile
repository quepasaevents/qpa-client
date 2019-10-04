FROM ubuntu:18.04

RUN apt-get update
RUN apt-get install -y curl

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update
RUN apt-get install -y nodejs yarn nginx

# application
RUN mkdir /opt/client

COPY ./dist/ssr ./opt/ssr
COPY ./package.json /opt/ssr
COPY ./yarn.lock /opt/ssr

COPY ./client.nginx /etc/nginx/sites-available/default

RUN mkdir /var/www/qpa
COPY ./dist/static/. /var/www/qpa

WORKDIR /opt/ssr

ENTRYPOINT service nginx start; node ssr-server.js
