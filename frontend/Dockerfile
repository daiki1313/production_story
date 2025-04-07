FROM node:18

WORKDIR /front

COPY ./package*.json /front
RUN npm install

COPY . /front

RUN npm run build

FROM nginx:alpine
COPY --from=0 /front/build /usr/share/nginx/html

EXPOSE 80

# Nginx を起動
CMD ["nginx", "-g", "daemon off;"]
