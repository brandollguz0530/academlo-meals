const { Orders } = require("../models/orders.models");
const { Meals } = require("../models/meals.models");
const { Restaurants } = require("../models/restaurants.models");
const { catchAsync } = require("../utils/catchAsync.utils");
const { AppError } = require("../utils/appError.utils");

const ordersCreate = catchAsync(async (req, res, next) => {
  const meal = await Meals.findOne({
    where: { id: req.body.mealId, status: "active" },
  });
  if (!meal) {
    return next(new AppError("not Found meal 😒", 404));
  }
  const totalPrice = meal.price * req.body.quantity;
  const userId = req.sessionUser.id;

  await Orders.create({
    quantity: req.body.quantity,
    mealId: req.body.mealId,
    userId,
    totalPrice,
    status: "active",
  });

  res.status(201).json({
    status: "success",
  });
});

const ordersUserAll = catchAsync(async (req, res) => {
  const ordersUser = await Orders.findAll({
    where: { userId: req.sessionUser.id },
    include: { model: Meals, include: { model: Restaurants } },
  });

  res.status(200).json({
    status: "success",
    data: {
      ordersUser,
    },
  });
});

const ordersUpdate = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await Orders.findOne({ where: { id, status: "active" } });

  if (!order) {
    return next(new AppError("not Found order 🙁", 404));
    // res.status(404).json({
    //   status: "Not found",
    // });
  }

  order.update({ status: "completed" });

  res.status(200).json({
    status: "success",
  });
});

const ordersDelete = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await Orders.findOne({ where: { id, status: "active" } });

  if (!order) {
    return next(new AppError("order not found 😣", 404));
  }

  order.update({ status: "cancelled" });

  res.status(200).json({
    status: "success",
  });
});

module.exports = {
  ordersCreate,
  ordersUserAll,
  ordersUpdate,
  ordersDelete,
};
