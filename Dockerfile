FROM node:8 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
COPY --from=node /dist/test-app /usr/share/nginx/html






