const express = require("express");
const { db } = require("./utils/database.utils");
const { Usersrouters } = require("./routes/users.routers");
const { Restaurantsrouters } = require("./routes/restaurants.routers");
const { Mealsrouters } = require("./routes/meals.routers");
const { Ordersrouters } = require("./routes/oders.routers");
const { globalErrorHandler } = require("./controllers/errors.controllers");

const app = express();
app.use(express.json());

app.use("/api/v1/users", Usersrouters);
app.use("/api/v1/restaurants", Restaurantsrouters);
app.use("/api/v1/meals", Mealsrouters);
app.use("/api/v1/orders", Ordersrouters);

app.use(globalErrorHandler);

app.all("*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: `${req.method} ${req.url} does not exists in our server 😣`,
  });
});

module.exports = { app };
