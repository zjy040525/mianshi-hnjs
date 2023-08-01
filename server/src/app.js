const { Sequelize, DataTypes } = require('sequelize');
const { SHA256 } = require('crypto-js');
const shufflePassword = require('./util/pwd');

const [host, port] = process.env.MYSQL_ADDRESS.split(':');

const app = new Sequelize({
  database: process.env.MYSQL_DATABASE,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  host,
  port,
  dialect: 'mysql',
  logging: false,
});

// 初始化身份认证记录
const initOperators = async () => {
  const hasOverride =
    process.env.NODE_ENV === 'development' && process.env.OPERATORS_PASSWORD;
  const signOperators = process.env.SIGN_OPERATORS?.split(',');
  const interviewOperators = process.env.INTERVIEW_OPERATORS?.split(',');
  const manageOperators = process.env.MANAGE_OPERATORS?.split(',');

  if (!signOperators || !interviewOperators || !manageOperators) {
    return;
  }

  const authentications = [];
  const operators = [
    ['SIGN', signOperators],
    ['INTERVIEW', interviewOperators],
    ['MANAGE', manageOperators],
  ];

  for (const [permission, permissionOperators] of operators) {
    for (const permissionOperator of permissionOperators) {
      const [username, nickname] = permissionOperator.split(':');

      try {
        const pwd = hasOverride
          ? process.env.OPERATORS_PASSWORD
          : shufflePassword();

        await Operator.create({
          username,
          nickname,
          password: SHA256(pwd).toString(),
          permission,
        });
        authentications.push([
          username,
          nickname,
          pwd,
          `${permission} PERMISSION`,
        ]);
      } catch (e) {
        authentications.push(
          `CANNOT ADD OPERATOR \`${username}\`, BECAUSE IT ALREADY EXISTS!`,
        );
      }
    }
  }
  authentications.length && console.log(authentications);
};

// 身份认证模型定义
const Operator = app.define(
  'operator',
  {
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    nickname: DataTypes.STRING,
    password: { type: DataTypes.STRING, allowNull: false },
    permission: {
      type: DataTypes.ENUM('SIGN', 'INTERVIEW', 'MANAGE'),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);
const Student = app.define(
  'student',
  {
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    id_card: DataTypes.STRING,
    graduated_school: DataTypes.STRING,
    telephone_number: DataTypes.STRING,
    registration_number: DataTypes.STRING,
    // 签到状态
    sign_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    // 签到时间
    signed_date: DataTypes.DATE,
    // 签到操作员
    signed_operator: DataTypes.INTEGER,
    // 面试专业
    interview_xq: DataTypes.ENUM('Processing', 'Success', 'Failed'),
    interview_ly: DataTypes.ENUM('Processing', 'Success', 'Failed'),
    interview_gd: DataTypes.ENUM('Processing', 'Success', 'Failed'),
    // 面试时间
    interviewed_date: DataTypes.DATE,
    // 面试操作员
    interviewed_operator: DataTypes.INTEGER,
  },
  {
    timestamps: false,
  },
);

// 初始化数据库
const initDB = async () => {
  try {
    await app.authenticate();
    console.log('Connection has been established successfully.');
    await app.sync();
    await initOperators();
    console.log('All databases synced.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

module.exports = {
  initDB,
  Operator,
  Student,
};
