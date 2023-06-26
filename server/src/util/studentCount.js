const { Student } = require('@/app');
const { Op } = require('sequelize');

const studentCount = async () => {
  // 获取签到人数
  const { count: signedCount } = await Student.findAndCountAll({
    where: {
      sign_status: true,
    },
  });

  // 获取未签到人数
  const { count: noSignedCount } = await Student.findAndCountAll({
    where: {
      sign_status: false,
    },
  });

  // 获取已面试人数
  const { count: interviewedCount } = await Student.findAndCountAll({
    where: {
      sign_status: true,
      interviewed_operator: {
        [Op.not]: null,
      },
    },
  });

  // 获取未面试人数
  const { count: noInterviewedCount } = await Student.findAndCountAll({
    where: {
      sign_status: true,
      interviewed_operator: null,
    },
  });
  return {
    signedCount,
    noSignedCount,
    interviewedCount,
    noInterviewedCount,
  };
};

module.exports = studentCount;
