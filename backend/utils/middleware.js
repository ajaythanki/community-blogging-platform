const jwt  = require("jsonwebtoken");
const User = require("../models/user");
const ErrorHandler = require("./ErrorHandler");
const logger = require("./logger");
const config = require("./config");
const { COOKIE_NAME } = require("./constants");

const requestLogger = (req, res, next) => {
  logger.info("Method:", req.method);
  logger.info("Path:  ", req.path);
  logger.info("Body:  ", req.body);
  logger.info("---");
  next();
};

const asyncHandler = (func) => (req, res, next) => {
  Promise.resolve(func(req, res, next)).catch(next);
};
const unknownEndpoint = (req, res, next) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorMiddleware = (err, req, res, next) => {
  logger.error(err);

  err.statusCode = err.statusCode || 500;
  err.mesage = err.mesage || "Internal Server Error";

  // wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  // duplicate key value in db
  if (err.code == 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "ValidationError") {
    err = new ErrorHandler(err.message, 400);
  }

  if (err.name === "JsonWebTokenError") {
    err = new ErrorHandler("Json web token is invalid, try again", 400);
  }

  if (err.name === "TokenExpiredError") {
    err = new ErrorHandler("Json web token is expired, try again", 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });

  // next(err);
};

const verifyToken = asyncHandler(async (req, res, next) => {
  const token = req.signedCookies[`${COOKIE_NAME}`];
  const decodedToken = await jwt.verify(token, config.SECRET);
  // const authorization = req.get("authorization");
  if (decodedToken) {
    req.decodedToken = decodedToken;
    next();
  } else {
    return res
      .status(401)
      .json({
        success: false,
        message: "Unauthorized",
        error: "Invalid token",
      });
  }
});

const isAuth = asyncHandler(async (req, res, next) => {
  const token = req.signedCookies[`${COOKIE_NAME}`];
    const decodedToken = await jwt.verify(token, config.SECRET);
    const user = await User.findById(decodedToken.id);
    if (!user) {
      return res
        .status(401)
        .json({
          success: false,
          message: "Unauthorized",
          error: "Invalid token",
        });
    }
    req.user = user;
    next();  
});


module.exports = {
  requestLogger,
  unknownEndpoint,
  errorMiddleware,
  verifyToken,
  isAuth,
  asyncHandler,
};