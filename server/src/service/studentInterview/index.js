const { Student, Operator } = require('@/app');
const resp = require('@/util/resp');
const { Sequelize } = require('sequelize');
const relation = require('@/util/relation');
const dayjs = require('dayjs');
const Server = require('@/server');
const {
  WS_MANAGE_OPERATION,
  WS_MANAGE_STATISTIC,
} = require('@/constant/socket');
const studentCount = require('@/util/studentCount');

exports.main = async (req, res) => {
  // 解析token
  const { username, password } = req.auth;
  // 获取请求携带过来的参数
  const { studentId, xq, gd, ly } = req.body;
  const { appWs } = Server;

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

    // 操作越权，不能对其他操作员处签到的学生进行处理
    if (
      originalStudent.interviewed_operator &&
      originalStudent.interviewed_operator !== operator.id
    ) {
      res
        .status(404)
        .json(
          resp(
            400,
            null,
            `操作越权，请到${operator.nickname ?? operator.username}处操作！`
          )
        );
      return;
    }

    // 更新学生信息
    // 修改只对非NULL的字段才有效
    await Student.update(
      {
        interview_xq: originalStudent.interview_xq ? xq : null,
        interview_ly: originalStudent.interview_ly ? ly : null,
        interview_gd: originalStudent.interview_gd ? gd : null,
        interviewed_date: Sequelize.fn('now'),
        interviewed_operator: operator.id,
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
    const student = await relation(updatedStudent);
    // 给所有的连接设备发送不同的消息
    for (const client of appWs.getWss().clients) {
      if (client._url.includes(WS_MANAGE_OPERATION)) {
        client.send(
          JSON.stringify({
            key: student.id_card,
            type: 'info',
            message: `有新的面试信息（${
              operator.nickname ?? operator.username
            }）`,
            description: `${student.name}（${student.id_card}）在${dayjs(
              student.interviewed_date
            ).format(' HH:mm:ss ')}完成了面试。`,
          })
        );
      } else if (client._url.includes(WS_MANAGE_STATISTIC)) {
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

    // 返回更新完成后的学生信息
    res.status(200).json(resp(200, student, '操作成功！'));
  } catch (e) {
    console.error(e);
    res.status(400).json(resp(400, null, '服务器错误！'));
  }
};
