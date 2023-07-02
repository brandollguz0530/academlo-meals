const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

// Establish db connection
const db = new Sequelize({
  dialect: "mysql2",
  host: "localhost",
  username: "root",
  password: "",
  port: 3306,
  database: "mealsdb",
  logging: false,
});

module.exports = { db, DataTypes };
