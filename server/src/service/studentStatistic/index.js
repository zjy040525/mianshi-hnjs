const { Student, Auth } = require('@/app');
const { Op } = require('sequelize');
const result = require('@/util/result');

exports.main = async (req, res) => {
  const { username, password } = req.auth;

  try {
    const auth = await Auth.findOne({
      where: {
        username,
        password,
      },
    });
    if (auth.permission !== 102) {
      res.status(400).json(result(400, null, '权限不足！'));
      return;
    }
    // 签到人数
    const { rows: signedCount } = await Student.findAndCountAll({
      where: {
        sign_status: true,
      },
    });
    // 未签到人数
    const { rows: noSignedCount } = await Student.findAndCountAll({
      where: {
        [Op.or]: [{ sign_status: false }, { sign_status: null }],
      },
    });
    res.status(200).json(
      result(
        200,
        {
          signedCount: signedCount.length,
          noSignedCount: noSignedCount.length,
        },
        'ok'
      )
    );
  } catch (e) {
    console.error(e);
    res.status(400).json(result(400, null, '服务器错误！'));
  }
};
