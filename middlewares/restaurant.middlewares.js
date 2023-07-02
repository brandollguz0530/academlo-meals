// Models
const { Restaurants } = require("../models/restaurants.models");
const { AppError } = require("../utils/appError.utils");
const { catchAsync } = require("../utils/catchAsync.utils");

const restaurantExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurants.findOne({ where: { id } });
  req.restaurant = restaurant;
  // If restaurant doesn't exist, send error message
  if (!restaurant) {
    return next(new AppError("restaurant not found ☹", 404));
  }

  // req.anyPropName = 'anyValue'
  req.restaurant = restaurant;
  next();
});

module.exports = {
  restaurantExists,
};
