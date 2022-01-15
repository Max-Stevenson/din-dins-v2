const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

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

mongoose
  .connect(
    `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@dindins-cluster-rxgr4.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is up on port:${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
