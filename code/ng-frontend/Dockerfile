# Name the node stage "builder"
FROM node:20.5.1 AS builder
# Set working directory
WORKDIR /app
# Copy all files from current directory to working dir in image
COPY . .
# install node modules and build assets
RUN npm install && npm run build
FROM nginx:1.25.2-alpine3.18-slim
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./nginx/json_log.conf /etc/nginx/conf.d/json_log.conf
# Copy static assets from builder stage
COPY --from=builder /app/dist/ng-frontend .
# Containers run nginx with global directives and daemon off
#ENTRYPOINT ["nginx", "-g", "daemon off;"]