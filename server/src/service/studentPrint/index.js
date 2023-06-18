const { Auth, Student } = require('@/app');
const result = require('@/util/result');

exports.main = async (req, res) => {
  const { username, password } = req.auth;
  const { studentId } = req.body;

  try {
    const auth = await Auth.findOne({
      where: {
        username,
        password,
      },
    });

    if (auth.permission !== 100) {
      res.status(400).send('Error');
      return;
    }
    const student = await Student.findOne({
      where: { id: studentId },
    });
    if (!student.sign_status) {
      res.status(404).json(result(400, null, '该学生未签到！'));
    }
    res.render('print', {
      student: student.dataValues,
      updated_at: student.updated_at.toLocaleString('zh-CN', {
        timezone: 'Asia/Shanghai',
      }),
      time: new Date(),
      htmlList: [
        student?.gd
          ? { weight: 3, element: '城市轨道交通运输与管理' }
          : { weight: 0, element: null },
        student?.ly
          ? { weight: 2, element: '216-217旅游服务与管理' }
          : { weight: 0, element: null },
        student?.xq
          ? { weight: 1, element: '221-223幼儿教育' }
          : { weight: 0, element: null },
      ]
        .filter(value => value.element)
        .sort((a, b) => b.weight - a.weight)
        .map((value, index, array) => {
          if (index === array.length - 1) {
            return '&nbsp; &nbsp; ' + value.element;
          }
          return '&nbsp; &nbsp; ' + value.element + '<br/><br/>';
        })
        .join(''),
      textList: [
        student?.gd
          ? { weight: 3, element: '城市轨道交通运输与管理' }
          : { weight: 0, element: null },
        student?.ly
          ? { weight: 2, element: '216-217旅游服务与管理' }
          : { weight: 0, element: null },
        student?.xq
          ? { weight: 1, element: '221-223幼儿教育' }
          : { weight: 0, element: null },
      ]
        .sort((a, b) => b.weight - a.weight)
        .map((value, index) => {
          if (index === 0) {
            value.isHead = true;
          }
          return value;
        }),
    });
  } catch (e) {
    console.error(e);
    res.status(400).json(result(400, null, '服务器错误！'));
  }
};
