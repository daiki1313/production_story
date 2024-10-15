FROM node:18

WORKDIR /front

COPY ./package*.json /front

RUN npm install

COPY . /front

# 開発サーバーを起動
CMD ["npm", "start"]
