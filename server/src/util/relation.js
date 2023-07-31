const { Operator } = require('@/app');

const relation = async (student) => {
  const parseValues = async (dataValues) => {
    const signed_operator = await Operator.findOne({
      where: {
        id: dataValues.signed_operator,
      },
    });
    const interviewed_operator = await Operator.findOne({
      where: {
        id: dataValues.interviewed_operator,
      },
    });
    return {
      ...dataValues,
      signed_operator: signed_operator
        ? {
            id: signed_operator.id,
            username: signed_operator.username,
            nickname: signed_operator.nickname,
          }
        : null,
      interviewed_operator: interviewed_operator
        ? {
            id: interviewed_operator.id,
            username: interviewed_operator.username,
            nickname: interviewed_operator.nickname,
          }
        : null,
    };
  };
  // 多个数组格式返回
  if (Array.isArray(student)) {
    return Promise.all(
      student.map(({ dataValues }) => parseValues(dataValues)),
    );
  }
  // 单个对象格式返回
  return parseValues(student.dataValues);
};

module.exports = relation;
