const { Operator } = require('@/app');

const relation = async students => {
  return Promise.all(
    students.map(async ({ dataValues }) => {
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
    })
  );
};

module.exports = relation;
