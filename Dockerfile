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

COPY ./dist ./opt/client
COPY ./package.json /opt/client
COPY ./yarn.lock /opt/client

COPY ./client.nginx /etc/nginx/sites-available/default

RUN mkdir /var/www/qpa
COPY ./bin /var/www/qpa

RUN (cd /opt/client; yarn install --production)
WORKDIR /opt/client

ENTRYPOINT service nginx start; node SSR/index.js
