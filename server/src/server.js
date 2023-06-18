const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const result = require('@/util/result');
const { SHA256 } = require('crypto-js');
const { engine } = require('express-handlebars');
const path = require('path');

// 服务器日志
const logger = morgan('combined');

class CloudBaseRunServer {
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
    // 用于判断和加密用户密码的中间件
    this.express.use((req, res, next) => {
      if (req.body.password) {
        if (req.body.password.length < 8) {
          res.status(400).json(result(400, null, '密码长度不得少于8个字符！'));
          return;
        }
        if (req.body.password.length > 32) {
          res.status(400).json(result(400, null, '密码长度不得大于32个字符！'));
          return;
        }
        req.body.password = SHA256(req.body.password).toString();
      }
      next();
    });
  }
}

module.exports = CloudBaseRunServer;
