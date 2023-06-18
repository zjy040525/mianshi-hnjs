const jsonwebtoken = require('jsonwebtoken');
const { expressjwt } = require('express-jwt');

/**
 * 生成token
 *
 * @param username token内保存的用户
 * @param password token内保存的加密过的认证密码
 * @param permission token内保存的用户权限等级
 * @return {string} 用户token
 * @author Jia-Yao Zhao
 */
const make = (username, password, permission) =>
  jsonwebtoken.sign(
    {
      username,
      password,
      permission,
    },
    process.env.JWT_SECRET,
    {
      algorithm: 'HS256',
      expiresIn: '7d',
      audience: 'interview-management-system-app',
      issuer: 'interview-management-system-server',
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
