FROM node:18 as builder

WORKDIR /app

COPY package*.json /app/

RUN npm install --registry=https://mirrors.cloud.tencent.com/npm/

COPY . /app

RUN env \
    && npm run build

FROM nginx:1.25.2

COPY --from=builder /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
