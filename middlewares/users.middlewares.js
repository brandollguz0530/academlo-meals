// Models
const { Users } = require("../models/users.models");
const { AppError } = require("../utils/appError.utils");
const { catchAsync } = require("../utils/catchAsync.utils");

const userExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await Users.findOne({ where: { id } });
  req.user = user;
  // If user doesn't exist, send error message
  if (!user) {
    return next(new AppError("user not found 😐", 404));
  }

  // req.anyPropName = 'anyValue'
  req.user = user;
  next();
});

const validateTokenAndId = (req, res, next) => {
  const { id } = req.params;

  // ! agrege el return
  if (!(parseInt(id) === req.sessionUser.id)) {
    return next(
      new AppError(
        "id from token does not match with id from end point 😌",
        402
      )
    );
    // res.status(402).json({
    //   status: "id from token does not match with id from end point",
    // });
  }
  next();
};

module.exports = {
  userExists,
  validateTokenAndId,
};
