const { Operator, Student } = require('@/app');
const resp = require('@/util/resp');

exports.main = async (req, res) => {
  // 解析token
  const { username, password } = req.auth;
  // 获取请求携带过来的参数
  const { studentId } = req.body;

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

    // 操作员的权限验证
    if (operator.permission !== 'SIGN') {
      res.status(400).send('Error');
      return;
    }

    // 获取指定Id学生
    const student = await Student.findOne({
      where: {
        id: studentId,
      },
    });

    // 学生不存在
    if (!student) {
      res.status(400).json(resp(400, null, '学生不存在！'));
      return;
    }

    // 签到后才能打印
    if (!student.sign_status) {
      res.status(404).json(resp(400, null, '该学生未签到，请先签到！'));
    }

    // 返回HTML打印模板
    res.status(200).render('print', {
      // 学生信息
      student: student.dataValues,
      // 学生字段更新时间
      updated_at: Date.parse(student.updated_at).toLocaleString('zh-CN'),
      // 当前时间戳
      timestamp: new Date().getTime(),
      htmlList: [
        student?.gd
          ? { weight: 3, element: '城市轨道交通运输与管理' }
          : { weight: 0, element: null },
        student?.ly
          ? { weight: 2, element: '旅游服务与管理' }
          : { weight: 0, element: null },
        student?.xq
          ? { weight: 1, element: '幼儿教育' }
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
          ? { weight: 2, element: '旅游服务与管理' }
          : { weight: 0, element: null },
        student?.xq
          ? { weight: 1, element: '幼儿教育' }
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
    res.status(400).json(resp(400, null, '服务器错误！'));
  }
};
