FROM node:20.11.0-bullseye
USER root
VOLUME /var/www/service
COPY ./ /var/www/service/
WORKDIR /var/www/service
EXPOSE 3000
CMD npm i  && npm run build && npm run start:prod