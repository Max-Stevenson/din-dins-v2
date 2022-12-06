const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const HttpError = require("../models/httpError");

dotenv.config();
const { JWT_TOKEN } = process.env;

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Authentication failed");
    }
    const decodedToken = jwt.verify(token, JWT_TOKEN);
    req.userData = { userId: decodedToken.userId };
    return req;
  } catch (err) {
    const error = new HttpError("Authentication failed", 401);
    return next(error);
  }
};
