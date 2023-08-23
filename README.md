# mianshi-hnjs

海宁技师学院面试管理系统前端

## Install

项目使用[Node.js](http://nodejs.org)，请确保你安装了它，版本建议 >=16

配置npm国内镜像源

```shell
$ npm config set registry https://registry.npmmirror.com
```

安装项目依赖

```shell
$ npm install
```

## Usage

配置环境变量，新建`.env` `.env.development` `.env.production`三个文件

`.env`

```dotenv
# 通用环境下的变量（所有环境下都有效）

VITE_APP_NAME=应用名称
VITE_DOCUMENT_NAME=打印预览组件的标题
```

`.env.development`

```dotenv
# 开发环境下的变量（仅在开发环境下有效）

VITE_API_URL=开发环境后端地址
VITE_WS_URL=开发环境后端地址
```

`.env.production`

```dotenv
# 正式环境下的变量（仅在正式环境下有效）

VITE_API_URL=正式环境后端地址
VITE_WS_URL=正式环境后端地址
```

环境变量配置完成后，启动服务

```shell
$ npm run dev
```

用于开发，支持热重载

```shell
$ npm run build
```

构建正式环境资源，构建完成将后得到`dist`文件夹，可以部署到服务器上

```shell
$ npm run preview
```

预览正式环境，可以测试正式环境下是否有bug

## Maintainers

[@zjy040525](https://github.com/zjy040525)

## Contributing

非常欢迎你的加入！[提一个 Issue](https://github.com/zjy040525/interview-management-system/issues/new)或者提交一个Pull Request

标准Readme遵循[Contributor Covenant](http://contributor-covenant.org/version/1/3/0/)行为规范

### Contributors
