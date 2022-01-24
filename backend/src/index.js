const dotenv = require("dotenv");

dotenv.config();
const { DB_USERNAME } = process.env;
const { DB_PASSWORD } = process.env;
const { DB_NAME } = process.env;
const PORT = process.env.PORT || 3000;

const mongoose = require("mongoose");
const app = require("./app");

mongoose
  .connect(
    `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@dindins-cluster-rxgr4.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is up on port:${PORT}`);
    });
  }).catch((err) => {
    console.log(err);
  });
