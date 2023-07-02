const { db, DataTypes } = require("../utils/database.utils");

const Reviews = db.define("review", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "active",
  },
});

module.exports = { Reviews };
