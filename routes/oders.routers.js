const express = require("express");
const {
  ordersCreate,
  ordersUserAll,
  ordersUpdate,
  ordersDelete,
} = require("../controllers/oders.controllers");

const { protectSession } = require("../middlewares/auth.middlewares");
const {
  createOrdersValidators,
} = require("../middlewares/validators.middleware");
const {
  orderExists,
  validateTokenAndUser,
} = require("../middlewares/orders.middlewares");

const Ordersrouters = express.Router();

Ordersrouters.use(protectSession);
Ordersrouters.post("/", createOrdersValidators, ordersCreate);
Ordersrouters.get("/me", ordersUserAll);
Ordersrouters.patch("/:id", orderExists, validateTokenAndUser, ordersUpdate);
Ordersrouters.delete("/:id", orderExists, validateTokenAndUser, ordersDelete);

module.exports = { Ordersrouters };
