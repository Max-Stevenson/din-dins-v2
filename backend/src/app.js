const express = require("express");
const bodyParser = require("body-parser");

const recipeRoutes = require("./routes/recipes-routes");
const userRoutes = require("./routes/user-routes");

const app = express();

app.use("/api/v1/recipes", recipeRoutes);
app.use("/api/v1/users", userRoutes);

app.listen(3000);
