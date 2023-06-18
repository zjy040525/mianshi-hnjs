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
});

// 初始化身份认证记录
const initOperators = async () => {
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
      try {
        const pwd = shufflePassword();

        await Operator.create({
          username: permissionOperator,
          password: SHA256(pwd).toString(),
          permission: permission,
        });
        authentications.push([
          permissionOperator,
          pwd,
          `${permission} PERMISSION`,
        ]);
      } catch (e) {
        authentications.push(
          `Cannot add operator ${permissionOperator}, because it already exists!`
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
    password: { type: DataTypes.STRING, allowNull: false },
    permission: {
      type: DataTypes.ENUM('SIGN', 'INTERVIEW', 'MANAGE'),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
const Student = app.define(
  'student',
  {
    name: { type: DataTypes.STRING },
    gender: { type: DataTypes.STRING },
    id_card: { type: DataTypes.STRING },
    graduated_school: { type: DataTypes.STRING },
    telephone_number: { type: DataTypes.STRING },
    registration_number: { type: DataTypes.STRING },
    xq: { type: DataTypes.ENUM('Processing', 'Success', 'Failed') },
    ly: { type: DataTypes.ENUM('Processing', 'Success', 'Failed') },
    gd: { type: DataTypes.ENUM('Processing', 'Success', 'Failed') },
    sign_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    created_at: { type: DataTypes.DATE, defaultValue: Sequelize.fn('now') },
    updated_at: { type: DataTypes.DATE, defaultValue: Sequelize.fn('now') },
  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
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
