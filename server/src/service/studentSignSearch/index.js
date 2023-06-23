const { Student, Operator } = require('@/app');
const { Sequelize } = require('sequelize');
const { Op } = require('sequelize');
const resp = require('@/util/resp');
const relation = require('@/util/relation');

exports.main = async (req, res) => {
  // 解析token
  const { username, password } = req.auth;
  // 获取地址栏上传递的参数
  const { idCard } = req.query;

  try {
    if (!idCard) {
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
    if (operator.permission !== 'SIGN') {
      res.status(400).json(resp(400, null, '权限不足！'));
      return;
    }

    // 根据条件查询学生
    const rawStudents = await Student.findAll({
      where: {
        // 学生身份证模糊查询
        id_card: {
          [Op.like]: `%${idCard}%`,
        },
      },
      // 优先显示未签到的学生
      order: [
        ['sign_status', 'ASC'],
        Sequelize.literal(`signed_operator=${operator.id} DESC`),
        ['signed_date', 'DESC'],
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
