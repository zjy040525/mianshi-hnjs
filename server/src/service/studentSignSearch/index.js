const { Student, Auth } = require('@/app');
const { Op } = require('sequelize');
const result = require('@/util/result');

exports.main = async (req, res) => {
  const limit = 25;
  const { username, password } = req.auth;
  const { idCard } = req.query;

  try {
    if (!idCard) {
      res.status(400).json(result(400, null, '参数无效！'));
      return;
    }
    const auth = await Auth.findOne({
      where: {
        username,
        password,
      },
    });
    if (auth.permission !== 100) {
      res.status(400).json(result(400, null, '权限不足！'));
      return;
    }
    const { rows } = await Student.findAndCountAll({
      limit,
      order: [['sign_status', 'ASC']],
      where: {
        id_card: {
          [Op.like]: `%${idCard}%`,
        },
      },
    });
    res.status(200).json(result(200, rows, 'ok'));
  } catch (e) {
    console.error(e);
    res.status(400).json(result(400, null, '服务器错误！'));
  }
};
