const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { SHA256 } = require('crypto-js');
const { engine } = require('express-handlebars');
const path = require('path');
const expressWs = require('express-ws');

// 服务器日志
const logger = morgan('combined');

class Server {
  static app = express();
  static appWs = expressWs(this.app);
  constructor() {
    this.app = Server.app;
    this.appWs = Server.appWs;

    Server.app.engine(
      'handlebars',
      engine({
        defaultLayout: false,
      })
    );
    Server.app.set('view engine', 'handlebars');
    Server.app.set('views', path.join(__dirname, '/views'));
    Server.app.use(
      express.json({
        // number类型的默认单位是bytes
        // 字符串需要带上数据单位
        limit: '500kb',
      })
    );
    Server.app.use(
      express.urlencoded({
        extended: true,
        limit: '500kb',
      })
    );
    Server.app.use(cors());
    Server.app.use(logger);
    // 用于加密用户密码的中间件
    Server.app.use((req, res, next) => {
      if (req.body.password) {
        req.body.password = SHA256(req.body.password).toString();
      }
      next();
    });
  }
}

module.exports = Server;
