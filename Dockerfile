FROM ubuntu:18.04

RUN apt-get update
RUN apt-get install -y curl

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update
RUN apt-get install -y nodejs yarn

# Node
RUN apt-get install -y nodejs

# application
RUN mkdir /opt/client

COPY ./dist ./opt/client
COPY ./package.json /opt/client
COPY ./yarn.lock /opt/client

RUN (cd /opt/client; yarn)

WORKDIR /opt/client

CMD node SSR/index.js
