const { Student, Operator } = require('@/app');
const resp = require('@/util/resp');
const { Sequelize } = require('sequelize');
const relation = require('@/util/relation');
const Server = require('@/server');
const dayjs = require('dayjs');
const {
  WS_OPERATION_PATHNAME,
  WS_STATISTIC_PATHNAME,
} = require('@/constant/socket');
const studentCount = require('@/util/studentCount');

exports.main = async (req, res) => {
  // 解析token
  const { username, password } = req.auth;
  const { studentId } = req.body;
  const { appWs } = Server;

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
    const student = await relation(updatedStudent);
    // 给所有的连接设备发送不同的消息
    for (const client of appWs.getWss().clients) {
      if (client._url.includes(WS_OPERATION_PATHNAME)) {
        client.send(
          JSON.stringify({
            key: student.id_card,
            type: 'info',
            message: `有新的签到信息（${
              operator.nickname ?? operator.username
            }）`,
            description: `${student.name}（${student.id_card}）在${dayjs(
              student.signed_date
            ).format(' HH:mm:ss ')}完成了签到。`,
          })
        );
      } else if (client._url.includes(WS_STATISTIC_PATHNAME)) {
        const counts = await studentCount();
        const rawStudents = await Student.findAll();
        const students = await relation(rawStudents);
        client.send(
          JSON.stringify({
            counts,
            students,
          })
        );
      }
    }

    res.status(200).json(resp(200, student, '签到成功！'));
  } catch (e) {
    console.error(e);
    res.status(400).json(resp(400, null, '服务器错误！'));
  }
};
