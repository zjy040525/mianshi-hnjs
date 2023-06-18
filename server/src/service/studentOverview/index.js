const { Student, Auth } = require('@/app');
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
    // 学生总览
    const { rows } = await Student.findAndCountAll();
    res.status(200).json(result(200, rows, 'ok'));
  } catch (e) {
    console.error(e);
    res.status(400).json(result(400, null, '服务器错误！'));
  }
};
