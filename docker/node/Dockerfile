FROM node:20.10.0-alpine AS dev

WORKDIR /app

COPY package*.json .yarnrc.yml  ./
COPY .yarn/releases/ ./.yarn/releases/

RUN corepack enable && yarn install

COPY . .

EXPOSE $APP_PORT

CMD ["yarn", "dev"]
