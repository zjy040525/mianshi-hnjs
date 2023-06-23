const { Student, Operator } = require('@/app');
const resp = require('@/util/resp');
const relation = require('@/util/relation');

exports.main = async (req, res) => {
  // 解析token
  const { username, password } = req.auth;

  try {
    // 查询操作员
    const operator = await Operator.findOne({
      where: {
        username,
        password,
      },
    });

    // 操作员不存在
    if (!operator) {
      res.status(400).json(resp(400, null, '操作员不存在！'));
      return;
    }

    // 操作员的权限验证
    if (operator.permission !== 'MANAGE') {
      res.status(400).json(resp(400, null, '权限不足！'));
      return;
    }

    // 学生总览
    const rawStudents = await Student.findAll();
    const students = await relation(rawStudents);

    res.status(200).json(resp(200, students, 'ok'));
  } catch (e) {
    console.error(e);
    res.status(400).json(resp(400, null, '服务器错误！'));
  }
};
