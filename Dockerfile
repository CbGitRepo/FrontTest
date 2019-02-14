FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm run build --prod

FROM nginx:alpine
COPY --from=node /dist/test-app /usr/share/nginx/html






