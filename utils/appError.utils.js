// 01. creamos clase contructora para tratar los mensajes de error y estatus
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.message = message;
    this.statusCode = statusCode;
    // si empieza con 4 es error del servidor y si es con 5 es error del usuario
    this.status = `${statusCode}`.startsWith("4") ? "error" : "fail";

    // Capture los mensajes que causaron el error
    Error.captureStackTrace(this);
  }
}

module.exports = { AppError };
