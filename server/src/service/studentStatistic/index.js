const { Student, Operator } = require('@/app');
const resp = require('@/util/resp');

exports.main = async (req, res) => {
  const { username, password } = req.auth;

  try {
    const operator = await Operator.findOne({
      where: {
        username,
        password,
      },
    });

    // 操作员的权限验证
    if (operator.permission !== 'MANAGE') {
      res.status(400).json(resp(400, null, '权限不足！'));
      return;
    }

    // 获取签到人数
    const { count: signedCount } = await Student.findAndCountAll({
      where: {
        sign_status: true,
      },
    });

    // 获取未签到人数
    const { count: noSignedCount } = await Student.findAndCountAll({
      where: {
        sign_status: false,
      },
    });

    res.status(200).json(resp(200, { signedCount, noSignedCount }, 'ok'));
  } catch (e) {
    console.error(e);
    res.status(400).json(resp(400, null, '服务器错误！'));
  }
};
