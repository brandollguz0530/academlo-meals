const { Meals } = require("../models/meals.models");
const { Restaurants } = require("../models/restaurants.models");
const { AppError } = require("../utils/appError.utils");
const { catchAsync } = require("../utils/catchAsync.utils");

const mealsCreate = catchAsync(async (req, res) => {
  const { id } = req.params;
  const newMeals = await Meals.create({
    restaurantId: id,
    name: req.body.name,
    price: req.body.price,
    status: "active",
  });

  res.status(201).json({
    status: "success",
    data: newMeals,
  });
});

const mealsAll = catchAsync(async (req, res) => {
  const meals = await Meals.findAll({
    where: { status: "active" },
    include: { model: Restaurants },
  });

  res.status(200).json({
    status: "success",
    data: {
      meals,
    },
  });
});

const mealsFind = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await Meals.findOne({
    where: { id },
    include: { model: Restaurants },
  });
  if (!meal) {
    return next(new AppError("not Found 😯", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      meal,
    },
  });
});

const mealsUpdate = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const meal = await Meals.findOne({ where: { id } });

  if (!meal) {
    return next(new AppError("not Found 😯", 404));
  }

  const result = await meal.update({
    name: req.body.name,
    price: req.body.price,
  });

  res.status(200).json({
    status: "success",
    data: result,
  });
});

const mealsDelete = catchAsync(async (req, res) => {
  const { id } = req.params;
  const meal = await Meals.findOne({ where: { id } });
  meal.update({ status: "delete" });

  res.status(200).json({
    status: "success",
  });
});

module.exports = {
  mealsCreate,
  mealsAll,
  mealsFind,
  mealsUpdate,
  mealsDelete,
};
