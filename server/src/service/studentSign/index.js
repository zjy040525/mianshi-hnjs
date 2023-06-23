const { Student, Operator } = require('@/app');
const resp = require('@/util/resp');
const { Sequelize } = require('sequelize');

exports.main = async (req, res) => {
  // 解析token
  const { username, password } = req.auth;
  const { studentId } = req.body;

  try {
    if (!studentId) {
      res.status(400).json(resp(400, null, '参数无效！'));
      return;
    }

    // 查询目标学生
    const targetStudent = await Student.findOne({
      where: {
        id: studentId,
      },
    });

    // 目标学生不存在
    if (!targetStudent) {
      res.status(400).json(resp(400, null, '学生不存在！'));
      return;
    }

    // 目标学生未签到
    if (targetStudent.sign_status) {
      res.status(400).json(resp(400, null, '该学生已经签到过了！'));
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
      res.status(400).json(operator(400, null, '权限不足！'));
      return;
    }

    // 更新学生信息（签到）
    await Student.update(
      {
        sign_status: true,
        signed_date: Sequelize.fn('now'),
        signed_operator: operator.id,
      },
      {
        where: {
          id: studentId,
        },
      }
    );

    // 获取更新（签到）完成后的学生信息
    const updatedStudent = await Student.findOne({
      where: {
        id: studentId,
      },
    });

    res.status(200).json(resp(200, updatedStudent, '签到成功！'));
  } catch (e) {
    console.error(e);
    res.status(400).json(resp(400, null, '服务器错误！'));
  }
};
