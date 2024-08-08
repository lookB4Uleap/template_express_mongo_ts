FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN yarn install

FROM node:20-alpine AS final
WORKDIR /app
COPY --from=builder ./app/dist ./dist
COPY package.json .
COPY yarn.lock .
COPY .env .
RUN yarn install --production
CMD [ "yarn", "start" ]