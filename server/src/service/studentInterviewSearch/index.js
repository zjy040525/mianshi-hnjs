const { Student, Auth } = require('@/app');
const result = require('@/util/result');
const { Op } = require('sequelize');

exports.main = async (req, res) => {
  const limit = 25;
  const { username, password } = req.auth;
  const { studentId } = req.query;

  try {
    if (!studentId) {
      res.status(400).json(result(400, null, '参数无效！'));
      return;
    }
    const auth = await Auth.findOne({
      where: {
        username,
        password,
      },
    });
    if (auth.permission !== 101) {
      res.status(400).json(result(400, null, '权限不足！'));
      return;
    }
    const { rows } = await Student.findAndCountAll({
      limit,
      where: {
        sign_status: true,
        id: {
          [Op.like]: `%${studentId}%`,
        },
      },
    });
    res.status(200).json(result(200, rows, 'ok'));
  } catch (e) {
    console.error(e);
    res.status(400).json(result(400, null, '服务器错误！'));
  }
};
