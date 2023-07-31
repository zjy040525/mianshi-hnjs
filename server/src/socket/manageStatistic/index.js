const wsLog = require('@/util/wsLog');
const jsonwebtoken = require('jsonwebtoken');
const studentCount = require('@/util/studentCount');
const relation = require('@/util/relation');
const { Operator, Student } = require('@/app');
const { JsonWebTokenError } = require('jsonwebtoken');
const { WS_STATISTIC_MESSAGE_KEY } = require('@/constant/socket');

exports.main = async (ws, req) => {
  ws.on('message', async msg => {
    try {
      const data = JSON.parse(msg);
      // 验证token
      const payload = jsonwebtoken.verify(data.token, process.env.JWT_SECRET);
      const operator = await Operator.findOne({
        where: {
          username: payload.username,
          password: payload.password,
        },
      });
      if (!operator) {
        throw new Error('操作员不存在！');
      }
      if (operator.permission !== 'MANAGE') {
        throw new Error('权限不足！');
      }
      // 添加自定义属性，用于推送不同的内容
      ws._url = req.url;
      // 系统日志
      wsLog(ws, payload, req);
      // 验证成功后发送数据
      const counts = await studentCount();
      const rawStudents = await Student.findAll();
      const students = await relation(rawStudents);
      ws.send(
        JSON.stringify({
          counts,
          students,
        }),
      );
    } catch (error) {
      const message = {
        type: 'error',
        key: WS_STATISTIC_MESSAGE_KEY,
        message: '海宁技师学院面试管理系统',
        description:
          error instanceof JsonWebTokenError
            ? '验证失败！请重新登录。'
            : error.message,
      };
      ws.send(JSON.stringify(message));
      ws.close();
    }
  });
};
