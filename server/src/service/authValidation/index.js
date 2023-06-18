const { Auth } = require('@/app');
const result = require('@/util/result');

/**
 * 此函数仅供验证，在express-jwt中间件处理错误异常
 *
 * @param req 请求
 * @param res 响应
 * @return {Promise<void>} Promise
 * @author Jia-Yao Zhao
 */
exports.main = async (req, res) => {
  const { username, password, permission } = req.auth;

  try {
    const auth = await Auth.findOne({
      where: { username, password, permission },
    });
    res.status(200).json(result(200, { permission: auth.permission }, 'ok'));
  } catch (e) {
    console.error(e);
    res.status(400).json(result(400, null, '服务器错误！'));
  }
};
