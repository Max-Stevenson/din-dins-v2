const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const HttpError = require("../models/httpError");
const User = require("../models/user");

dotenv.config();
const { JWT_TOKEN } = process.env;

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new HttpError("Authentication failed: no token provided", 401);
    }
    const decodedToken = jwt.verify(token, JWT_TOKEN);
    if (!decodedToken) {
      throw new HttpError("Authentication failed: invalid token", 401);
    }
    const { userId } = decodedToken;
    if (!userId) {
      throw new HttpError("Authentication failed: missing userId in token", 401);
    }
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw new HttpError("Authentication failed: user not found", 401);
    }
    req.user = user;
    return next();
  } catch (err) {
    return next(err);
  }
};
