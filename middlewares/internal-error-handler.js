const internalErrorHandler = (err, _req, res, _next) => {
  console.error(err);
  return res.sendStatus(500);
};

module.exports = internalErrorHandler;
