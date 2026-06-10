const writeLog = require("./logger");

function requestLogger(req, res, next) {
  const startTime = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - startTime;

    writeLog(
      `${req.method} ${req.originalUrl} | Status: ${res.statusCode} | Duration: ${duration}ms`
    );
  });

  next();
}

module.exports = requestLogger;