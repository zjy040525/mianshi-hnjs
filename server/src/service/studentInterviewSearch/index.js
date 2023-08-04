const { Student, Operator } = require('@/app');
const { Op, Sequelize } = require('sequelize');
const resp = require('@/util/resp');
const relation = require('@/util/relation');

exports.main = async (req, res) => {
  // 解析token
  const { username, password } = req.auth;
  // 获取地址栏上传递的参数
  const { studentId } = req.query;

  try {
    if (!studentId) {
      res.status(400).json(resp(400, null, '参数无效！'));
      return;
    }

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
    if (operator.permission !== 'INTERVIEW') {
      res.status(400).json(resp(400, null, '权限不足！'));
      return;
    }

    // 根据条件查询学生
    const minId =
      isNaN(parseInt(studentId)) || parseInt(studentId) < 1
        ? 1
        : parseInt(studentId);
    const rawStudents = await Student.findAll({
      where: {
        // 已完成签到
        sign_status: true,
        // 根据学生Id的范围查询
        id: {
          [Op.between]: [minId, minId + 24],
        },
      },
      order: [
        Sequelize.literal(`interviewed_operator IS NULL DESC`),
        Sequelize.literal(`interviewed_operator=${operator.id} DESC`),
        ['interviewed_date', 'DESC'],
      ],
      limit: 25,
    });
    const students = await relation(rawStudents);

    res.status(200).json(resp(200, students, 'ok'));
  } catch (e) {
    console.error(e);
    res.status(400).json(resp(400, null, '服务器错误！'));
  }
};
