const express = require("express");

const {
  restaurantCreate,
  restaurantsAll,
  restaurantFind,
  restaurantsUpdate,
  restaurantsDelete,
} = require("../controllers/restaurants.controllers");
const {
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviews.controller");

const {
  protectSession,
  protectAdmin,
} = require("../middlewares/auth.middlewares");
const {
  createRestaurantValidators,
  createReviewValidators,
} = require("../middlewares/validators.middleware");
const { restaurantExists } = require("../middlewares/restaurant.middlewares");
const {
  reviewsExists,
  validateTokenAndUser,
} = require("../middlewares/reviews.middlewares");

const Restaurantsrouters = express.Router();

Restaurantsrouters.use(protectSession);
Restaurantsrouters.post("/", createRestaurantValidators, restaurantCreate);
Restaurantsrouters.get("/", restaurantsAll);
Restaurantsrouters.get("/:id", restaurantExists, restaurantFind);
Restaurantsrouters.patch(
  "/:id",
  protectAdmin,
  restaurantExists,
  restaurantsUpdate
);
Restaurantsrouters.delete(
  "/:id",
  protectAdmin,
  restaurantExists,
  restaurantsDelete
);

//Reviews routes // ! aqui le falta obtener el userid desde la sesion
Restaurantsrouters.post(
  "/reviews/:restaurantId",
  createReviewValidators,
  createReview
);

Restaurantsrouters.patch(
  "/reviews/:restaurantId/:id/",
  reviewsExists,
  validateTokenAndUser,
  updateReview
);

Restaurantsrouters.delete(
  "/reviews/:restaurantId/:id/",
  reviewsExists,
  validateTokenAndUser,
  deleteReview
);

module.exports = { Restaurantsrouters };
