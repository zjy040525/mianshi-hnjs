require('module-alias/register');
require('dotenv').config();

const LocalServer = require('./server');
const { initDB } = require('./app');
const result = require('./util/resp');
const { TokenExpiredError } = require('jsonwebtoken');
const token = require('@/util/token');

const port = 3000;
const server = new LocalServer().express;

// 注册API服务

// 身份认证
server.post('/auth', require('./service/auth').main);
// 有效性认证
server.post(
  '/auth/validation',
  token.required(),
  require('./service/authValidation').main
);
// 搜索已签到的学生
server.get(
  '/student/interview/search',
  token.required(),
  require('./service/studentInterviewSearch').main
);
// 搜索所有学生
server.get(
  '/student/sign/search',
  token.required(),
  require('./service/studentSignSearch').main
);
// 为学生签到
server.patch(
  '/student/sign',
  token.required(),
  require('./service/studentSign').main
);
// 为学生打印，返回HTML用于打印
server.post(
  '/student/print',
  token.required(),
  require('./service/studentPrint').main
);
// 为学生面试
server.patch(
  '/student/interview',
  token.required(),
  require('./service/studentInterview').main
);
// 学生签到统计信息
server.get(
  '/student/statistic',
  token.required(),
  require('./service/studentStatistic').main
);
// 学生总览
server.get(
  '/student/overview',
  token.required(),
  require('./service/studentOverview').main
);

async function main() {
  // 初始化数据库
  await initDB();
  // token验证中间件
  server.use((err, _req, res, next) => {
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
  server.use((_req, res) => {
    res.status(404).send(null);
  });
  server.listen(port, () =>
    console.log(`Server ready at: http://localhost:${port}`)
  );
}

main();
