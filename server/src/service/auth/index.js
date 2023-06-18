const jwt = require('@/util/jwt');
const result = require('@/util/result');
const { Auth } = require('@/app');

exports.main = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!(username && password)) {
      res.status(400).json(result(400, null, '参数无效！'));
      return;
    }

    const auth = await Auth.findOne({
      where: { username, password },
    });
    if (!auth) {
      res.status(400).json(result(400, null, '用户名或密码错误！'));
      return;
    }

    res.status(200).json(
      result(
        200,
        {
          token: jwt.createToken(auth.username, auth.password, auth.permission),
          permission: auth.permission,
        },
        '认证成功！'
      )
    );
  } catch (e) {
    console.error(e);
    res.status(400).json(result(400, null, '服务器错误！'));
  }
};
