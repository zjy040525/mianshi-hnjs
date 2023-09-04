FROM node:18-alpine

RUN apk add tzdata \
  && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
  && echo Asia/Shanghai > /etc/timezone \
  && apk add ca-certificates \
  && apk del tzdata

WORKDIR /app

COPY package*.json /app/

RUN npm install --registry=https://mirrors.cloud.tencent.com/npm/

COPY . /app

RUN npm run build


FROM nginx:alpine

COPY /app/dist/ /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
