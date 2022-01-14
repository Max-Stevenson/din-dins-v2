const express = require("express");
const bodyParser = require("body-parser");

const recipeRoutes = require("./routes/recipes-routes");
const userRoutes = require("./routes/user-routes");

const app = express();
app.use(bodyParser.json());

app.use("/api/v1/recipes", recipeRoutes);
app.use("/api/v1/users", userRoutes);

// Express provided error handle middleware
app.use((err, req, res, next) => {
  if (res.headerSent) {
    return next(err);
  }
  res.status(err.code || 500);
  res.json({ message: err.message || "An unknown error occuried" });
});
app.listen(3000);
