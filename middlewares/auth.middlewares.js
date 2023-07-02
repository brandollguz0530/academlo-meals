const { Users } = require("../models/users.models");
const jwt = require("jsonwebtoken");
const { catchAsync } = require("../utils/catchAsync.utils");
const { AppError } = require("../utils/appError.utils");
// const catchAsync = (fn) => {
//   return (req, res, next) => {
//     fn(req, res, next).catch((err) => next(err));
//   };
// };

const protectSession = catchAsync(async (req, res, next) => {
  // Get token
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Extract token
    // req.headers.authorization = 'Bearer token'
    token = req.headers.authorization.split(" ")[1]; // -> [Bearer, token]
  }

  // Check if the token was sent or not
  if (!token) {
    return res.status(403).json({
      status: "error",
      message: "Invalid session",
    });
  }

  // Verify the token
  const decoded = jwt.verify(token, "blsjhos");

  // Verify the token's owner
  const user = await Users.findOne({
    where: { id: decoded.id, status: "active" },
  });

  if (!user) {
    return res.status(403).json({
      status: "error",
      message: "The owner of the session is no longer active 😒",
    });
  }

  // Grant access
  req.sessionUser = user;
  next();
});

const protectAdmin = (req, res, next) => {
  const { sessionUser } = req;

  if (sessionUser.role !== "admin") {
    return next(
      new AppError("You do not have the access level for this data. 😯", 403)
    );
    // res.status(403).json({
    //   status: "error",
    //   message: "You do not have the access level for this data.",
    // });
  }

  next();
};

module.exports = {
  protectSession,
  protectAdmin,
};
