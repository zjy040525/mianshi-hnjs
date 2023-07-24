const jsonwebtoken = require('jsonwebtoken');
const { expressjwt } = require('express-jwt');

/**
 * 生成token
 * @param {*} param0 token中的载荷
 * @returns 用户的token
 */
const make = ({ username, nickname, password, permission }) =>
  jsonwebtoken.sign(
    {
      username,
      nickname,
      password,
      permission,
    },
    process.env.JWT_SECRET,
    {
      algorithm: 'HS256',
      expiresIn: '7d',
      audience: 'interview-management-system-app',
      issuer: 'interview-management-system-backend',
    }
  );

/**
 * 使用express-jwt中间件验证用户token是否有效
 *
 * @param credentialsRequired 默认为false，启用状态，当接收到的请求没有token时，返回验证失败，取消接下来的操作
 * @author Jia-Yao Zhao
 */
const required = credentialsRequired =>
  expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    credentialsRequired,
  });

module.exports = { make, required };
