require('module-alias/register');
require('dotenv').config();

const Server = require('./server');
const { initDB } = require('./app');
const result = require('./util/resp');
const { TokenExpiredError } = require('jsonwebtoken');
const token = require('@/util/token');
const {
  WS_MANAGE_OPERATION,
  WS_MANAGE_STATISTIC,
} = require('@/constant/socket');

const port = 3000;
const { app } = new Server();

// 注册API服务

// 认证
app.post('/authentication', require('./service/authentication').main);
// 授权
app.post(
  '/authorization',
  token.required(),
  require('./service/authorization').main
);
// 搜索已签到的学生
app.get(
  '/student/interview/search',
  token.required(),
  require('./service/studentInterviewSearch').main
);
// 搜索所有学生
app.get(
  '/student/sign/search',
  token.required(),
  require('./service/studentSignSearch').main
);
// 为学生签到
app.patch(
  '/student/sign',
  token.required(),
  require('./service/studentSign').main
);
// 为学生打印，返回HTML用于打印
app.post(
  '/student/print',
  token.required(),
  require('./service/studentPrint').main
);
// 为学生面试
app.patch(
  '/student/interview',
  token.required(),
  require('./service/studentInterview').main
);

// 操作员的操作信息套接字
app.ws(WS_MANAGE_OPERATION, require('./socket/manageOperation').main);
// 统计信息套接字
app.ws(WS_MANAGE_STATISTIC, require('./socket/manageStatistic').main);

async function main() {
  // 初始化数据库
  await initDB();
  // token验证中间件
  app.use((err, _req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      // err.inner可能抛出的错误类型
      // JsonWebTokenError = token格式错误
      // TokenExpiredError = token已过期
      const errorMsg =
        err.inner instanceof TokenExpiredError
          ? '认证已过期，请重新认证！'
          : '请先认证！';

      res.status(err.status).send(result(err.status, null, errorMsg));
    } else {
      next(err);
    }
  });
  // 匹配不到任何路由
  app.use((_req, res) => {
    res.status(404).send(null);
  });
  app.listen(port, () =>
    console.log(`Server ready at: http://localhost:${port}`)
  );
}

main();
