# Stage 1: Build the application
FROM node:alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build


# Stage 2: Serve the application with Nginx
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*

# Copy built files from the builder stage
COPY --from=builder /app/dist/microfrontend-navbar /usr/share/nginx/html

# Copy the custom Nginx configuration file

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]