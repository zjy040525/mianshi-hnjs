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
# 签到操作员的用户名，多个用`,`分隔；别名用`:`分隔
SIGN_OPERATORS=sign1:一号签到员,sign2:二号签到员,sign3:三号签到员,sign4:四号签到员,sign5:五号签到员
# 面试操作员的用户名，多个用`,`分隔；别名用`:`分隔
INTERVIEW_OPERATORS=score1:一号面试员,score2:二号面试员,score3:三号面试员,score4:四号面试员,score5:五号面试员
# 管理员的用户名，多个用`,`分隔；别名用`:`分隔
MANAGE_OPERATORS=admin1:管理员
```

启动服务。

命令行启动（开发环境推荐）。

```sh
$ pnpm serve
```

通过 PM2 启动（生产环境推荐）。

一共启动 8 个服务，自动实现负载均衡，更多命令请前往 [PM2](https://pm2.keymetrics.io/docs/usage/quick-start/) 官网查看。

```sh
$ npm -g install pm2
$ pm2 start ./src/index.js -n IMS_backend -i 8
```

## Maintainers

[@zjy040525](https://github.com/zjy040525)。

## Contributing

非常欢迎你的加入！[提一个 Issue](https://github.com/zjy040525/IMS/issues/new) 或者提交一个 Pull Request。

标准 Readme 遵循 [Contributor Covenant](http://contributor-covenant.org/version/1/3/0/) 行为规范。

### Contributors

## License

[MIT](../LICENSE) © Jia-Yao Zhao
