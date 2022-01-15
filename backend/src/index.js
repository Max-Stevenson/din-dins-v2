const dotenv = require("dotenv");
dotenv.config();
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const PORT = process.env.PORT || 3000;

const mongoose = require("mongoose");
const app = require("../src/app");

mongoose
.connect(
  `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@dindins-cluster-rxgr4.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
)
.then(() => {
  app.listen(PORT, () => {
    console.log(`Server is up on port:${PORT}`);
  });
}).catch((err) => {
  console.log(err);
});
