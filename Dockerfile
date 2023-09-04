FROM node:18-alpine as builder

RUN apk add tzdata \
  && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
  && echo Asia/Shanghai > /etc/timezone \
  && apk add ca-certificates \
  && apk del tzdata

WORKDIR /app

COPY package*.json /app/

RUN npm install --registry=https://mirrors.cloud.tencent.com/npm/ \
  && printenv | grep VITE_ > /app/.env \
  && printenv | grep VITE_ > /app/.env.production

COPY . /app

RUN ls -al /app \
  && npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
