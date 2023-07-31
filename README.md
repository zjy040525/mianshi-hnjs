# Interview Management System

海宁技师学院面试管理系统 IMS（Interview Management System）前端

## Install

这个项目使用 [node](http://nodejs.org) 和 [pnpm](https://pnpm.io/)。请确保你本地安装了它们。

配置阿里镜像源。

```sh
$ npm config set registry https://registry.npmmirror.com
```

安装 pnpm。

```sh
$ npm -g install pnpm
```

安装项目依赖。

```sh
$ pnpm install
```

## Usage

配置环境变量。在根目录新建`.env.development`和`.env.production`文件，分别用于开发环境和正式环境。

后端的默认端口为 3000。

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

```sh
$ pnpm dev
```

构建正式环境资源。

构建完成后会创建名为 `dist` 的文件夹，可以把文件夹内的所有文件部署到服务器上。

```sh
$ pnpm build
```

注意：本项目有使用路由作为页面导航，如果你使用的是 Apache 或 Nginx 服务，请务必配置好重定向，否则刷新页面会出现 404 的错误。

Nginx conf `nginx.conf`

```
location / {
  ...
  try_files $uri.html $uri $uri/ /index.html;
  ...
}
```

Apache conf `.htaccess`

```
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

非常欢迎你的加入！[提一个 Issue](https://github.com/zjy040525/IMS/issues/new) 或者提交一个 Pull Request。

标准 Readme 遵循 [Contributor Covenant](http://contributor-covenant.org/version/1/3/0/) 行为规范。

### Contributors

## License

[MIT](LICENSE) © Jia-Yao Zhao
