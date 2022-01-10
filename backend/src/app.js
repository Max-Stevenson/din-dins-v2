const express = require("express");
const bodyParser = require("body-parser");

const recipeRoutes = require("./routes/recipes-routes");

const app = express();

app.use(recipeRoutes);

app.listen(3000);
