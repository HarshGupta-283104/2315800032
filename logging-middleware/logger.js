const fs = require("fs");
const path = require("path");

const logFile = path.join(__dirname, "logs.txt");

function writeLog(message) {
  const logMessage = `${new Date().toISOString()} - ${message}\n`;

  fs.appendFileSync(logFile, logMessage);
}

module.exports = writeLog;