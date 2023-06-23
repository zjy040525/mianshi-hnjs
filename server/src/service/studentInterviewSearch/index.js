const { Student, Operator } = require('@/app');
const { Op } = require('sequelize');
const resp = require('@/util/resp');

exports.main = async (req, res) => {
  // 单次查询最大数量
  const limit = 25;
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
    const { rows } = await Student.findAndCountAll({
      where: {
        // 已完成签到
        sign_status: true,
        // 学生Id模糊查询
        id: {
          [Op.like]: `%${studentId}%`,
        },
      },
      limit,
    });

    res.status(200).json(resp(200, rows, 'ok'));
  } catch (e) {
    console.error(e);
    res.status(400).json(resp(400, null, '服务器错误！'));
  }
};
