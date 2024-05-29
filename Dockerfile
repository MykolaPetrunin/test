FROM node:alpine3.19 as build
WORKDIR /usr/app
COPY . /usr/app
ARG NPM_ENV
RUN npm install
RUN npm run build$NPM_ENV

FROM nginx:1.23.1-alpine
EXPOSE 80
COPY ./docker/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/app/build /usr/share/nginx/html
