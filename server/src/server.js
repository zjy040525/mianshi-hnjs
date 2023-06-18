const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { SHA256 } = require('crypto-js');
const { engine } = require('express-handlebars');
const path = require('path');

// 服务器日志
const logger = morgan('combined');

class LocalServer {
  constructor() {
    this.express = express();
    this.express.engine(
      'handlebars',
      engine({
        defaultLayout: false,
      })
    );
    this.express.set('view engine', 'handlebars');
    this.express.set('views', path.join(__dirname, '/views'));
    this.express.use(
      express.json({
        // number类型的默认单位是bytes
        // 字符串需要带上数据单位
        limit: '500kb',
      })
    );
    this.express.use(
      express.urlencoded({
        extended: true,
        limit: '500kb',
      })
    );
    this.express.use(cors());
    this.express.use(logger);
    // 用于加密用户密码的中间件
    this.express.use((req, res, next) => {
      if (req.body.password) {
        req.body.password = SHA256(req.body.password).toString();
      }
      next();
    });
  }
}

module.exports = LocalServer;
