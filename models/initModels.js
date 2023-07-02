const { Meals } = require("../models/meals.models");
const { Orders } = require("../models/orders.models");
const { Restaurants } = require("../models/restaurants.models");
const { Reviews } = require("../models/reviews.models");
const { Users } = require("../models/users.models");

const initModels = () => {
  Restaurants.hasMany(Reviews, { foreignKey: "restaurantId" });
  Reviews.belongsTo(Restaurants);

  Restaurants.hasMany(Meals, { foreignKey: "restaurantId" });
  Meals.belongsTo(Restaurants);

  Meals.hasOne(Orders, { foreignKey: "mealId" });
  Orders.belongsTo(Meals);

  Users.hasMany(Orders, { foreignKey: "userId" });
  Orders.belongsTo(Users);

  Users.hasMany(Reviews, { foreignKey: "userId" });
  Reviews.belongsTo(Users);
};

module.exports = { initModels };
