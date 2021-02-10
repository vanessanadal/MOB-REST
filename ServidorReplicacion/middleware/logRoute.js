const logger = require("../config/logger.js");

function notFoundLog(req, res, next) {
  var err = new Error("Not Found");
  logger.error({
    message: `ERROR: ${err.message}`,
  });
  next(err);
}

function setLog(req, res, next) {
  logger.info(req.method + " " + req.originalUrl);
  next();
}

module.exports = { notFoundLog, setLog };
