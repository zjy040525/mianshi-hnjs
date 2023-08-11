# 海宁技师学院面试管理系统

面试管理系统前端项目，后端项目在[server](./server)目录下。

## Install

该项目使用[node](http://nodejs.org)，请确保你安装了它们。

Node.js版本建议>=16。

配置npm国内镜像源。

```shell
$ npm config set registry https://registry.npmmirror.com
```

安装项目依赖。

```shell
$ npm install
```

## Usage

配置环境变量。在根目录新建`.env.development`和`.env.production`文件，分别用于开发环境和正式环境。

后端的默认端口为**3000**。

有关后端的使用教程请[点击这里](server/README.md)。

```dotenv
# .env.development
VITE_API_URL=http://localhost:3000
VITE_WS_URL=ws://localhost:3000
```

```dotenv
# .env.production
VITE_API_URL=https://正式环境地址
VITE_WS_URL=wss://正式环境地址
```

启动本地服务。

```shell
$ npm run dev
```

构建正式环境资源。

构建完成后会创建名为 `dist` 的文件夹，可以把文件夹内的所有文件部署到服务器上。

```shell
$ npm run build
```

### Deployment

注意：本项目有使用路由作为页面导航，如果你使用的是Apache或Nginx部署，请务必配置好重定向，否则刷新页面会出现404的错误。

你可以在public/目录下新建对应服务的配置文件名，这样在build时会自动打包到dist中，方便上传。

#### nginx.conf

```text
location / {
  try_files $uri.html $uri $uri/ /index.html;
}
```

#### .htaccess

```text
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```

## Maintainers

[@zjy040525](https://github.com/zjy040525)。

## Contributing

非常欢迎你的加入！[提一个 Issue](https://github.com/zjy040525/interview-management-system/issues/new) 或者提交一个 Pull Request。

标准 Readme 遵循 [Contributor Covenant](http://contributor-covenant.org/version/1/3/0/) 行为规范。

### Contributors
