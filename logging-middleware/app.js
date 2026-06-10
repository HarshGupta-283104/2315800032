const express = require("express");
const requestLogger = require("./requestLogger");

const app = express();

app.use(requestLogger);

app.get("/", (req, res) => {
  res.send("Logging Middleware Working");
});

app.get("/notifications", (req, res) => {
  res.json({
    message: "Notifications endpoint"
  });
});

app.get("/error", (req, res) => {
  throw new Error("Sample Error");
});

app.use((err, req, res, next) => {
  console.error(err.message);

  res.status(500).json({
    error: err.message
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});