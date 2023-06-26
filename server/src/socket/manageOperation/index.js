const jsonwebtoken = require('jsonwebtoken');

exports.main = async (socket, req) => {
  try {
    // 验证token有效性
    jsonwebtoken.verify(socket.protocol, process.env.JWT_SECRET);
    // 添加自定义属性，用于推送不同的内容
    socket._url = req.url;
  } catch (err) {
    // token验证失败
    socket.close();
  }
};
