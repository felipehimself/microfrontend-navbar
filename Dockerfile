FROM node:alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Adds app version to nginx
RUN apk add --no-cache jq
RUN jq -n --arg version "$(jq -r '.version' package.json)" '{ version: $version }' > ./dist/microfrontend-navbar/version.json


FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist/microfrontend-navbar /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]