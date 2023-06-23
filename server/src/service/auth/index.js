const { Operator } = require('@/app');
const token = require('@/util/token');
const resp = require('@/util/resp');

exports.main = async (req, res) => {
  // 获取请求携带过来的参数
  const { username, password } = req.body;

  try {
    if (!(username && password)) {
      res.status(400).json(res(400, null, '参数无效！'));
      return;
    }

    const operator = await Operator.findOne({
      where: {
        username,
        password,
      },
    });

    // 操作员不存在
    if (!operator) {
      res.status(400).json(resp(400, null, '用户名称或认证密码错误！'));
      return;
    }

    // 认证成功
    res.status(200).json(
      resp(
        200,
        {
          id: operator.id,
          token: token.make(
            operator.username,
            operator.password,
            operator.permission
          ),
          username: operator.username,
          nickname: operator.nickname,
          permission: operator.permission,
        },
        '认证成功！'
      )
    );
  } catch (e) {
    console.error(e);
    res.status(400).json(resp(400, null, '服务器错误！'));
  }
};
