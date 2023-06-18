const { Student, Operator } = require('@/app');
const { Op } = require('sequelize');
const resp = require('@/util/resp');

exports.main = async (req, res) => {
  // 单次查询最大数量
  const limit = 25;
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

    // 操作员的权限验证
    if (operator.permission !== 'SIGN') {
      res.status(400).json(resp(400, null, '权限不足！'));
      return;
    }

    // 根据条件查询学生
    const { rows } = await Student.findAndCountAll({
      limit,
      // 优先显示未签到的学生
      order: [['sign_status', 'ASC']],
      where: {
        // 学生身份证模糊查询
        id_card: {
          [Op.like]: `%${idCard}%`,
        },
      },
    });

    res.status(200).json(resp(200, rows, 'ok'));
  } catch (e) {
    console.error(e);
    res.status(400).json(resp(400, null, '服务器错误！'));
  }
};
