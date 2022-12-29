const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const HttpError = require("../models/httpError");
const User = require("../models/user");

dotenv.config();
const { JWT_TOKEN } = process.env;

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Authentication failed");
    }
    const decodedToken = jwt.verify(token, JWT_TOKEN);
    if (decodedToken) {
      const decodedTokenUserId = decodedToken.userId;
      if (decodedTokenUserId) {
        User.findOne({ decodedTokenUserId }).then((user) => {
          if (!user) {
            throw new Error();
          }
        });
      }
    }
    return next();
  } catch (err) {
    const error = new HttpError("Authentication failed", 401);
    return next(error);
  }
};
