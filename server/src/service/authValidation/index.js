const { Operator } = require('@/app');
const resp = require('@/util/resp');

/**
 * 此函数仅供验证，在express-jwt中间件处理错误异常
 *
 * @param req 请求
 * @param res 响应
 * @return {Promise<void>} Promise
 * @author Jia-Yao Zhao
 */
exports.main = async (req, res) => {
  // 解析token
  const { username, password, permission } = req.auth;

  try {
    // 查询操作员
    const operator = await Operator.findOne({
      where: {
        username,
        password,
        permission,
      },
    });

    // 操作员不存在
    if (!operator) {
      res.status(400).json(resp(400, null, '操作员不存在！'));
      return;
    }

    // 返回操作员实际的权限
    res.status(200).json(
      resp(
        200,
        {
          nickname: operator.nickname,
          permission: operator.permission,
        },
        'ok'
      )
    );
  } catch (e) {
    console.error(e);
    res.status(400).json(resp(400, null, '服务器错误！'));
  }
};
