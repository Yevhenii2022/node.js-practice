module.exports = (err, req, res, next) => {
  const statusCode = res.statusCode || 500;
  const stack = process.env.NODE_ENV === "production" ? null : err.stack;
  res.status(statusCode).json({ code: statusCode, stack });
};
