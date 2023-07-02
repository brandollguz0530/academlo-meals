// Models
const { Orders } = require("../models/orders.models");
const { AppError } = require("../utils/appError.utils");
const { catchAsync } = require("../utils/catchAsync.utils");

const orderExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Orders.findOne({ where: { id } });
  req.order = order;
  // If order doesn't exist, send error message
  if (!order) {
    return next(new AppError("order not found 🙁", 404));
  }

  // req.anyPropName = 'anyValue'
  req.order = order;
  next();
});

const validateTokenAndUser = (req, res, next) => {
  //Validar que el dueño del token sea el creador del review
  const { userId } = req.order;

  if (!(parseInt(userId) === req.sessionUser.id)) {
    return next(new AppError("You are not the owner of the order", 402));
    //  res.status(402).json({
    //     status: "You are not the owner of the order",
    //   });
  }
  next();
};

module.exports = {
  orderExists,
  validateTokenAndUser,
};
