FROM node:18

WORKDIR /front

COPY ./package*.json /front
RUN npm install

COPY . /front

# 開発
# EXPOSE 3000
# CMD ["npm", "start"]

# 本番
RUN npm run build
FROM nginx:alpine
COPY --from=0 /front/build /usr/share/nginx/html

EXPOSE 80
# Nginx を起動
CMD ["nginx", "-g", "daemon off;"]
