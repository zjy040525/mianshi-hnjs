const result = require('@/util/result');
const { Student, Auth } = require('@/app');

exports.main = async (req, res) => {
  const { username, password } = req.auth;
  const { studentId } = req.body;

  try {
    if (!studentId) {
      res.status(400).json(result(400, null, '参数无效！'));
      return;
    }

    // 判断需要更新信息的学生是否存在
    const targetStudent = await Student.findOne({
      where: { id: studentId },
    });
    if (!targetStudent) {
      res.status(400).json(result(400, null, '学生不存在！'));
      return;
    }
    if (targetStudent.status) {
      res.status(400).json(result(400, null, '该学生已经签到过了！'));
      return;
    }

    const auth = await Auth.findOne({
      where: {
        username,
        password,
      },
    });
    if (auth.permission !== 100) {
      res.status(400).json(result(400, null, '权限不足！'));
      return;
    }

    // 更新学生信息
    await Student.update(
      {
        sign_status: true,
        sign_number: 'DEFAULT',
      },
      {
        where: {
          id: studentId,
        },
      }
    );
    // 获取更新（签到）完成后的学生信息
    const data = await Student.findOne({
      where: { id: studentId },
    });
    res.status(200).json(result(200, data, '签到成功！'));
  } catch (e) {
    console.error(e);
    res.status(400).json(result(400, null, '服务器错误！'));
  }
};
