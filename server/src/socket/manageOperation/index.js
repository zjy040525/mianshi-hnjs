const jsonwebtoken = require('jsonwebtoken');
const { Operator } = require('@/app');
const { WS_OPERATOR_NOT_FOUND_KEY } = require('@/constant/socket');

exports.main = async (socket, req) => {
  try {
    // 解析token
    const { username, password } = jsonwebtoken.verify(
      socket.protocol,
      process.env.JWT_SECRET
    );
    // 查询操作员
    const operator = await Operator.findOne({
      where: {
        username,
        password,
      },
    });
    // 操作员不存在
    if (!operator) {
      socket.send(
        JSON.stringify({
          key: WS_OPERATOR_NOT_FOUND_KEY,
          type: 'error',
          message: '海宁技师学院面试管理系统',
          description: '操作员不存在！',
        })
      );
      socket.close();
    }
    // 操作员的权限验证
    if (operator.permission !== 'MANAGE') {
      socket.send(
        JSON.stringify({
          key: WS_OPERATOR_NOT_FOUND_KEY,
          type: 'error',
          message: '海宁技师学院面试管理系统',
          description: '权限不足！',
        })
      );
      socket.close();
    }
    // 添加自定义属性，用于推送不同的内容
    socket._url = req.url;
  } catch (err) {
    // token验证失败
    socket.close();
  }
};
