require("dotenv").config();
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const HttpError = require("../models/httpError");
const User = require("../models/user");

const { JWT_TOKEN } = process.env;

exports.createUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new HttpError("Invalid input passed, please check your data", 422);
    }

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new HttpError("User exists already, please login", 422);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const createdUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await createdUser.save();

    const token = jwt.sign(
      {
        userId: createdUser.id,
        email: createdUser.email,
      },
      JWT_TOKEN,
      { expiresIn: "1h" },
    );

    res.status(201).json({ userId: createdUser.id, email: createdUser.email, token });
  } catch (error) {
    next(error);
  }
};

exports.authenticate = (req, res, next) => {
  try {
    const { token } = req.body;

    const decoded = jwt.verify(token, JWT_TOKEN);
    res.json({ message: "Token is valid" }, decoded);
  } catch (err) {
    next(new HttpError("Invalid Token", 401));
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new HttpError("Invalid credentials, please try again", 401);
    }

    const isValidPassword = await bcrypt.compare(password, existingUser.password);
    if (!isValidPassword) {
      throw new HttpError("Invalid credentials, please try again", 401);
    }

    const token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
      },
      JWT_TOKEN,
      { expiresIn: "1h" },
    );

    return res.status(200).json({ userId: existingUser.id, email: existingUser.email, token });
  } catch (err) {
    // handle specific errors
    if (err.code === 11000) {
      return next(new HttpError("Email already exists, please try again", 422));
    }
    if (err instanceof HttpError) {
      return next(err);
    }
    // handle unexpected errors
    return next(new HttpError("Login failed, please try again", 500));
  }
};
