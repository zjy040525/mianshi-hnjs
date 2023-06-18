const { Student, Auth } = require('@/app');
const result = require('@/util/result');

exports.main = async (req, res) => {
  const { username, password } = req.auth;
  const { studentId, xq, gd, ly } = req.body;

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

    // 原始信息
    const originalStudent = await Student.findOne({
      where: { id: studentId },
    });
    // 更新学生信息
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
    const updatedStudent = await Student.findOne({
      where: { id: studentId },
    });
    res.status(200).json(result(200, updatedStudent, '操作成功！'));
  } catch (e) {
    console.error(e);
    res.status(400).json(result(400, null, '服务器错误！'));
  }
};
