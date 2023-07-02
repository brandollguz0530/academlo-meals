const { db, DataTypes } = require("../utils/database.utils");
const { Restaurants } = require("./restaurants.models");

const Meals = db.define("meal", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "active",
  },
});

Meals.belongsTo(Restaurants, { foreignKey: "restaurantId" });

module.exports = { Meals };
