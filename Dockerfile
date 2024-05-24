FROM node:alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY ./dist/microfrontend-navbar/system .


FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder . /usr/share/nginx/html

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]