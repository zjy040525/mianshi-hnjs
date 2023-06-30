const jsonwebtoken = require('jsonwebtoken');
const { Operator, Student } = require('@/app');
const studentCount = require('@/util/studentCount');
const relation = require('@/util/relation');
const socketLogger = require('@/util/socketLogger');

exports.main = async (socket, req) => {
  try {
    // 解析token
    const jwt = jsonwebtoken.verify(socket.protocol, process.env.JWT_SECRET);
    // 查询操作员
    const operator = await Operator.findOne({
      where: {
        username: jwt.username,
        password: jwt.password,
      },
    });
    // 操作员不存在
    if (!operator) {
      socket.close();
    }
    // 操作员的权限验证
    if (operator.permission !== 'MANAGE') {
      socket.close();
    }
    // 添加自定义属性，用于推送不同的内容
    socket._url = req.url;
    socketLogger(socket, jwt, req);
    // 首次连接成功后发送指定消息
    const counts = await studentCount();
    const rawStudents = await Student.findAll();
    const students = await relation(rawStudents);
    socket.send(
      JSON.stringify({
        counts,
        students,
      })
    );
  } catch (err) {
    // token验证失败
    socket.close();
  }
};
