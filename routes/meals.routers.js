const express = require("express");
const {
  mealsCreate,
  mealsAll,
  mealsFind,
  mealsUpdate,
  mealsDelete,
} = require("../controllers/meals.controllers");

const {
  protectSession,
  protectAdmin,
} = require("../middlewares/auth.middlewares");
const {
  createMealsValidators,
} = require("../middlewares/validators.middleware");
const { mealExists } = require("../middlewares/meals.middleware");

const Mealsrouters = express.Router();

Mealsrouters.use(protectSession);
Mealsrouters.post("/:id", createMealsValidators, mealsCreate);
Mealsrouters.get("/", mealsAll);
Mealsrouters.get("/:id", mealExists, mealsFind);
Mealsrouters.patch("/:id", protectAdmin, mealExists, mealsUpdate);
Mealsrouters.delete("/:id", protectAdmin, mealExists, mealsDelete);

module.exports = { Mealsrouters };
