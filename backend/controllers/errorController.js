const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};
const handleDuplicateFieldsDB = (err) => {
  const message = `Duplicate Field error value = "${err.keyValue.name}": Please use another value`;
  return new AppError(message, 400);
};
const handleJWTError = () => {
  return new AppError('Invalid Token , please log in again !! ', 401);
};
const handleExpiredJWTError = () => {
  return new AppError('Expired Token , please log in again !! ', 401);
};
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors)
    .map((el) => el.message)
    .join('. ');
  const message = `Invalid Input data: ${errors}`;
  return new AppError(message, 400);
};
const sendErrorDev = (err, req, res) => {
  // API
  if (req.originalUrl.startsWith('/api')) {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    // Rendered website
    console.error('ERROR !! 💥', err);

    res.status(err.statusCode).json({
      status: `error`,
      message: err,
    });
  }
};
const sendErrorProd = (err, req, res) => {
  // A ) API
  if (req.originalUrl.startsWith('/api')) {
    // Operational , Trusted Error , send mesaage to client
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
      // Programming or other unknown Error  : Don't leak error details
    } else {
      // 1 log error
      console.error('ERROR !! 💥', err);
      // 2 Send Generic message
      res.status(500).json({
        status: 'error',
        message: 'Something went wrong !!!',
      });
    }
  } else {
    // B ) Rendered Website
    // Operational , Trusted Error , send mesaage to client
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: `error`,
        message: err,
      });
      // Programming or other unknown Error  : Don't leak error details
    } else {
      // 1 log error
      console.error('ERROR !! 💥', err);
      // 2 Send Generic message
      res.status(err.statusCode).json({
        status: `error`,
        message: err,
      });
    }
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = Object.assign(err);
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleExpiredJWTError();
    sendErrorProd(error, req, res);
  }
};
