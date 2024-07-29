// This function is called when no other middleware handle the request
const notFound = (req, res, next) => {
  const err = new Error(`Not Found-${req.originalUrl}`);
  res.status(404);
  next(err);
};

// in order to override the default express error handler we use below code

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // check for mongoose cast error
  if (err.name === "CastError" && err.kind === "ObjectId") {
    message = "Resource not found";
    statusCode = 404;
  }
  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? "in production" : err.stack,
  });
};

export { notFound, errorHandler };
