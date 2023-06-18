const { Student, Operator } = require('@/app');
const resp = require('@/util/resp');

exports.main = async (req, res) => {
  // 解析token
  const { username, password } = req.auth;
  // 获取请求携带过来的参数
  const { studentId, xq, gd, ly } = req.body;

  try {
    if (!studentId) {
      res.status(400).json(resp(400, null, '参数无效！'));
      return;
    }

    // 学生原始信息
    const originalStudent = await Student.findOne({
      where: {
        id: studentId,
      },
    });

    // 学生不存在
    if (!originalStudent) {
      res.status(400).json(resp(400, null, '学生不存在！'));
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
    if (operator.permission !== 'INTERVIEW') {
      res.status(400).json(resp(400, null, '权限不足！'));
      return;
    }

    // 更新学生信息
    // 修改只对非NULL的字段才有效
    await Student.update(
      {
        xq: originalStudent.xq ? xq : null,
        ly: originalStudent.ly ? ly : null,
        gd: originalStudent.gd ? gd : null,
      },
      {
        where: {
          id: studentId,
        },
      }
    );

    // 获取更新完成后的学生信息
    const updatedStudent = await Student.findOne({
      where: {
        id: studentId,
      },
    });

    // 返回更新完成后的学生信息
    res.status(200).json(resp(200, updatedStudent, '操作成功！'));
  } catch (e) {
    console.error(e);
    res.status(400).json(resp(400, null, '服务器错误！'));
  }
};
