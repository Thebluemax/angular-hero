# Stage 1
FROM node:14-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build --prod

# Stage 2
FROM ubuntu:20.04
USER root
WORKDIR /home/app
COPY package.json /home/app/package.json
RUN apt-get update
RUN apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_14.x  | bash -
RUN apt-get -y install nodejs
RUN apt update
RUN apt-get -y install nginx
RUN npm i -g json-server

COPY --from=build-step /app/dist/superhero /var/www/html
COPY start.sh ./start.sh
RUN chmod +x ./start.sh
CMD  ./start.sh
