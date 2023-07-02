const dotenv = require("dotenv");

// Utils
const { AppError } = require("../utils/appError.utils");
// usamos la variable de entorno
dotenv.config({ path: "./.env" });

// mensaje de envio para desarrollo
const sendErrorDev = (error, req, res) => {
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    error,
    stack: error.stack,
  });
};

// mensaje para produccion
const sendErrorProd = (error, req, res) => {
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message || "Something went wrong!",
  });
};

const tokenExpiredError = () => {
  return new AppError("Session expired 🙁", 403);
};

const tokenInvalidSignatureError = () => {
  return new AppError("Session invalid 🙁", 403);
};

const dbUniqueConstraintError = () => {
  return new AppError("The entered email has already been taken 🙁", 400);
};

const globalErrorHandler = (error, req, res, next) => {
  // Set default values for original error obj
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "fail";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(error, req, res);
  } else if (process.env.NODE_ENV === "production") {
    let err = { ...error };

    if (error.name === "TokenExpiredError") err = tokenExpiredError();
    else if (error.name === "JsonWebTokenError")
      err = tokenInvalidSignatureError();
    else if (error.name === "SequelizeUniqueConstraintError")
      err = dbUniqueConstraintError();
    sendErrorProd(err, req, res);
  }
};

module.exports = { globalErrorHandler };
