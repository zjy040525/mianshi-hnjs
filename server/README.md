# Interview Management System Backend

海宁技师学院面试管理系统 IMS（Interview Management System）后端

## Install

这个项目使用 [node](http://nodejs.org) 和 [pnpm](https://pnpm.io/)。请确保你本地安装了它们。

Node.js的版本建议>=16。

配置国内镜像源。

```shell
$ npm config set registry https://registry.npmmirror.com
```

安装 pnpm。

```shell
$ npm -g install pnpm
```

安装项目依赖。

```shell
$ pnpm install
```

## Usage

配置环境变量。在根目录新建`.env`、`.env.development`、`.env.production`。

```dotenv
# .env 通用环境变量

JWT_SECRET=自定义密钥
# 签到操作员的用户名，多个用`,`分隔；别名用`:`分隔
SIGN_OPERATORS=sign1:一号签到员,sign2:二号签到员,sign3:三号签到员,sign4:四号签到员,sign5:五号签到员
# 面试操作员的用户名，多个用`,`分隔；别名用`:`分隔
INTERVIEW_OPERATORS=score1:一号面试员,score2:二号面试员,score3:三号面试员,score4:四号面试员,score5:五号面试员
# 管理员的用户名，多个用`,`分隔；别名用`:`分隔
MANAGE_OPERATORS=admin1:管理员
```

```dotenv
# .env.development 开发环境变量

MYSQL_ADDRESS=开发环境数据库地址
MYSQL_USERNAME=用户名
MYSQL_PASSWORD=密码
MYSQL_DATABASE=要使用的数据库名字
# （可选）如果有需要，你可以覆盖.env通用环境中的变量
# SIGN_OPERATORS=sign:签到员[DEV]
# INTERVIEW_OPERATORS=score:面试员[DEV]
# MANAGE_OPERATORS=admin:管理员[DEV]
# （可选）开发环境独有，手动设置所有操作员的密码（不能小于8位），默认随机生成
# OPERATORS_PASSWORD=88888888
```

```dotenv
# .env.production 正式环境变量

MYSQL_ADDRESS=正式环境数据库地址
MYSQL_USERNAME=用户名
MYSQL_PASSWORD=密码
MYSQL_DATABASE=要使用的数据库名字
```

启动服务。

命令行启动（开发环境推荐使用）。

操作员的密码将在第一次运行时随机生成，并且在控制台输出操作员对应的密码。

**后续的运行将跳过该步骤，并且不再输出操作员对应的密码！**

```shell
$ pnpm start:dev
```

命令行启动（正式环境使用，推荐正式环境使用 PM2 启动）。

```shell
$ pnpm start:prod
```

通过 PM2 启动（正式环境推荐使用）。

一共启动 8 个服务，自动实现负载均衡，更多命令请前往 [PM2](https://pm2.keymetrics.io/docs/usage/quick-start/) 官网查看。

```shell
$ npm -g install pm2
$ pm2 start app.json
```

## Maintainers

[@zjy040525](https://github.com/zjy040525)。

## Contributing

非常欢迎你的加入！[提一个 Issue](https://github.com/zjy040525/interview-management-system/issues/new) 或者提交一个 Pull Request。

标准 Readme 遵循 [Contributor Covenant](http://contributor-covenant.org/version/1/3/0/) 行为规范。

### Contributors

## License
