const { body, validationResult } = require("express-validator");
const { AppError } = require("../utils/appError.utils");

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errMessage = errors.array().map((err) => err.msg);
    const message = errMessage.join(". ");

    return next(new AppError(message, 400));
  }
  next();
};

const createUserValidators = [
  body("name")
    .isString()
    .withMessage("Name must be a string 😶")
    .notEmpty()
    .withMessage("Name cannot be empty 🙄")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters 😶"),
  body("email").isEmail().withMessage("Must provide a valid email 😶"),
  body("password")
    .isString()
    .withMessage("Password must be a string 😶")
    .notEmpty()
    .withMessage("Password cannot be empty 😶")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters 😶"),
  body("role").notEmpty().withMessage("Role can only be normal or admin 😶"),
  checkValidations,
];
const createRestaurantValidators = [
  body("name")
    .isString()
    .withMessage("Name must be a string 😐")
    .notEmpty()
    .withMessage("Name cannot be empty 😐")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters 😐"),
  body("address")
    .isString()
    .withMessage("address must be a string 😐")
    .notEmpty()
    .withMessage("address cannot be empty 😐"),
  body("rating").notEmpty().withMessage("rating cannot be empty 😐"),
  checkValidations,
];
const createReviewValidators = [
  body("rating").notEmpty().withMessage("rating cannot be empty 😐"),
  body("comment")
    .isString()
    .withMessage("comment must be a string 😐")
    .notEmpty()
    .withMessage("comment cannot be empty 😐"),
  checkValidations,
];
const createMealsValidators = [
  body("name")
    .isString()
    .withMessage("Name must be a string 😯")
    .notEmpty()
    .withMessage("Name cannot be empty 😯")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters 😯"),
  body("price").notEmpty().withMessage("Price cannot be empty 😯"),
  body("restaurantId").isEmpty().withMessage("restaurantId cannot be empty 😯"),
  checkValidations,
];
const createOrdersValidators = [
  body("mealId").notEmpty().withMessage("mealId cannot be empty 😯"),
  body("userId").isEmpty().withMessage("userId cannot be empty 😯"),
  body("totalPrice").isEmpty().withMessage("totalPrice cannot be empty 😯"),
  body("quantity").notEmpty().withMessage("quantity cannot be empty 😯"),
  checkValidations,
];

module.exports = {
  createUserValidators,
  createMealsValidators,
  createOrdersValidators,
  createRestaurantValidators,
  createReviewValidators,
};
