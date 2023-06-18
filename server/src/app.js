const { Sequelize, DataTypes } = require('sequelize');

const [host, port] = process.env.MYSQL_ADDRESS.split(':');

const app = new Sequelize({
  database: process.env.MYSQL_DATABASE,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  host,
  port,
  dialect: 'mysql',
});

// 身份认证模型定义
const Auth = app.define(
  'authentication',
  {
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    permission: { type: DataTypes.INTEGER, unsigned: true, allowNull: false },
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
    sign_status: { type: DataTypes.BOOLEAN },
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
    console.log('All databases synced.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

module.exports = {
  initDB,
  Auth,
  Student,
};
