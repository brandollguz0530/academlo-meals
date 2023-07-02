const { db, DataTypes } = require("../utils/database.utils");
const { Meals } = require("./meals.models");

const Orders = db.define("order", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  mealId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  totalPrice: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  quantity: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  status: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "active",
  },
});

Orders.belongsTo(Meals, { foreignKey: "mealId" });

module.exports = { Orders };
