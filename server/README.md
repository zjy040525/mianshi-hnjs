# Interview Management System Server

海宁技师学院面试管理系统 IMS（Interview Management System）后端

## Install

这个项目使用 [node](http://nodejs.org) 和 [pnpm](https://pnpm.io/)。请确保你本地安装了它们。

配置阿里镜像源。

```sh
$ npm config set registry https://registry.npmmirror.com
```

安装依赖。

```sh
$ npm -g install pnpm
$ pnpm install
```

## Usage

配置环境变量。在根目录新建`.env`。

```dotenv
MYSQL_ADDRESS=数据库地址
MYSQL_USERNAME=用户名
MYSQL_PASSWORD=密码
MYSQL_DATABASE=要使用的数据库的名称
JWT_SECRET=身份认证私钥
SIGN_OPERATORS=签到操作员的用户名，多个用,分割，例如：SIGN_OPERATORS=sign1,sign2,sign3,sign4,sign5
INTERVIEW_OPERATORS=面试操作员的用户名，多个用,分割，例如：INTERVIEW_OPERATORS=score1,score2,score3,score4,score5
MANAGE_OPERATORS=管理员的用户名，多个用,分割，例如：MANAGE_OPERATORS=admin1,admin2
```

启动服务。

通过 PM2 启动（推荐）。

一共启动 8 个服务，自动实现负载均衡，更多命令请前往 [PM2](https://pm2.keymetrics.io/docs/usage/quick-start/) 官网查看。

```sh
$ npm -g install pm2
$ pm2 start .\src\index.js -n IMS_SERVER -i 8
```

服务关闭/重启/重载

```sh
$ pm2 stop IMS_SERVER

$ pm2 restart IMS_SERVER

$ pm2 reload IMS_SERVER
```

命令行启动（不推荐生产环境使用）。

```sh
$ pnpm start
```

## Maintainers

[@zjy040525](https://github.com/zjy040525)。

## Contributing

非常欢迎你的加入！[提一个 Issue](https://github.com/zjy040525/IMS/issues/new) 或者提交一个 Pull Request。

标准 Readme 遵循 [Contributor Covenant](http://contributor-covenant.org/version/1/3/0/) 行为规范。

### Contributors

## License

[MIT](../LICENSE) © Jia-Yao Zhao
