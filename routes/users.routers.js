const express = require("express");
const {
  loginUser,
  signupUser,
  updateUser,
  deleteUser,
  ordersUserAll,
  orderUserFind,
} = require("../controllers/users.controllers");

const { protectSession } = require("../middlewares/auth.middlewares");
const {
  createUserValidators,
} = require("../middlewares/validators.middleware");
const {
  userExists,
  validateTokenAndId,
} = require("../middlewares/users.middlewares");

const Usersrouters = express.Router();

Usersrouters.post("/signup", signupUser);
Usersrouters.post("/login", loginUser);
Usersrouters.use(protectSession);
Usersrouters.patch("/:id", userExists, validateTokenAndId, updateUser);
Usersrouters.delete("/:id", userExists, validateTokenAndId, deleteUser);
Usersrouters.get("/orders", ordersUserAll);
Usersrouters.get("/orders/:id", orderUserFind);

module.exports = { Usersrouters };
