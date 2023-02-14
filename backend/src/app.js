const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const recipeRoutes = require("./routes/recipesRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());
app.options("*", cors()); // enable pre-flight
app.use(bodyParser.json({ limit: "50mb", type: "application/json" }));
app.use(bodyParser.json());
app.use("/api/v1/recipes", recipeRoutes);
app.use("/api/v1/users", userRoutes);
app.get("/images/:filename", (req, res) => {
  const { filename } = req.params;
  const imagePath = path.join(__dirname, "images", filename);
  res.sendFile(imagePath);
});

// Express provided error handle middleware
app.use((err, req, res, next) => {
  if (res.headerSent) {
    return next(err);
  }
  res.status(err.code || 500);
  res.json({ error: err || "An unknown error occuried" });
  return app;
});

module.exports = app;
