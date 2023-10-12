FROM node:18-alpine3.16

RUN apk update
RUN apk add bash
RUN npm install -g pnpm
RUN npm install -g turbo
RUN pnpm install