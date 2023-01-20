/* eslint-disable no-console */
require("dotenv").config();
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const HttpError = require("../models/httpError");
const User = require("../models/user");

const { JWT_TOKEN } = process.env;

exports.createUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid input passed, please check your data", 422),
    );
  }

  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    console.log(error);

    return next(new HttpError("Signup failed, please try again", 500));
  }

  if (existingUser) {
    return next(new HttpError("User exists already, please login", 422));
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(
      new HttpError("Could could not create user, please try again", 500),
    );
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await createdUser.save();
  } catch (error) {
    console.error(error);

    return next(new HttpError("Signup failed, please try again.", 500));
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: createdUser.id,
        email: createdUser.email,
      },
      JWT_TOKEN,
      { expiresIn: "1h" },
    );
  } catch (err) {
    console.log(err);
    return next(new HttpError("Signup failed, please try again.", 500));
  }

  return res.status(201).json({ userId: createdUser.id, email: createdUser.email, token });
};

exports.authenticate = (req, res, next) => {
  const { token } = req.body;

  // Verify the token
  try {
    const decoded = jwt.verify(token, JWT_TOKEN);
    return res.json({ message: "Token is valid" }, decoded);
  } catch (err) {
    return next(new HttpError("Invalid Token", 401));
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    console.log(error);
    return next(new HttpError("Login failed, please try again", 500));
  }

  if (!existingUser) {
    return next(new HttpError("Invalid credentials, please try again", 403));
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    return next(

      new HttpError("Could not log you in, please check credentials", 500),
    );
  }

  if (!isValidPassword) {
    return next(new HttpError("Invalid credentials, please try again", 401));
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
      },
      JWT_TOKEN,
      { expiresIn: "1h" },
    );
  } catch (err) {
    console.log(err);
    return next(new HttpError("login failed, please try again.", 500));
  }

  return res.status(200).json({ userId: existingUser.id, email: existingUser.email, token });
};
