FROM node:16 as base

WORKDIR /usr/local/apps/server

COPY package*.json ./
RUN npm i --quiet
ENV PATH=/usr/local/apps/server/.bin:$PATH

WORKDIR /usr/local/apps/server/dev
COPY tsconfig.json ./
COPY src ./src
COPY .env ./ 
