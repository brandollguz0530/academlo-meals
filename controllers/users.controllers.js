const { Users } = require("../models/users.models");
const { Orders } = require("../models/orders.models");
const { catchAsync } = require("../utils/catchAsync.utils");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { AppError } = require("../utils/appError.utils");
const { Restaurants } = require("../models/restaurants.models");
const { Meals } = require("../models/meals.models");

const signupUser = catchAsync(async (req, res) => {
  const { name, email, password, role } = req.body;

  const salt = await bcrypt.genSalt(12);
  const hashedPass = await bcrypt.hash(password, salt);

  const newUser = await Users.create({
    name,
    email,
    password: hashedPass,
    role,
  });

  newUser.password = undefined;

  res.status(201).json({
    status: "success",
    data: newUser,
  });
});

const loginUser = catchAsync(async (req, res, next) => {
  const user = await Users.findOne({
    where: { status: "active", email: req.body.email },
  });

  if (!user) {
    return next(new AppError("error login 🙁", 401));
  }

  if (!(await bcrypt.compare(req.body.password, user.password))) {
    return next(new AppError("error login 😫", 401));
  }

  const token = jwt.sign({ id: user.id }, "blsjhos", {
    expiresIn: "2h",
  });

  res.status(200).json({
    status: "success",
    data: {
      token,
    },
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await Users.findOne({ where: { id } });
  if (!user) {
    return next(new AppError("user not found 🙁", 404));
  }
  const userUpdated = await user.update({
    name: req.body.name,
    email: req.body.email,
  });
  userUpdated.password = undefined;

  res.status(200).json({
    status: "success",
    data: userUpdated,
  });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await Users.findOne({ where: { id } });
  if (!user) {
    return next(new AppError("user not found", 404));
  }
  const userDeleted = await user.update({ status: "delete" });
  userDeleted.password = undefined;

  res.status(200).json({
    status: "success",
    msg: "user deleted success 😁😀",
  });
});

const ordersUserAll = catchAsync(async (req, res) => {
  //Incluir restaurante

  const ordersUser = await Orders.findAll({
    where: { userId: req.sessionUser.id, status: "active" },
    include: [
      { model: Users },
      {
        model: Meals,
        attributes: ["id", "name"],
        include: { model: Restaurants },
      },
    ],
  });

  res.status(200).json({
    status: "success",
    data: {
      ordersUser,
    },
  });
});

const orderUserFind = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const orderUser = await Orders.findOne({
    where: { id, userId: req.sessionUser.id },
    include: { model: Users },
  });
  if (!orderUser) {
    return next(new AppError("order not found 😫", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      orderUser,
    },
  });
});

module.exports = {
  loginUser,
  signupUser,
  updateUser,
  deleteUser,
  ordersUserAll,
  orderUserFind,
};
