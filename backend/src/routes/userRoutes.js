const express = require("express");
const { check } = require("express-validator");
const usersControllers = require("../controllers/usersController");

const router = express.Router();

router.post(
  "/",
  [
    check("name")
      .not()
      .isEmpty(),
    check("email")
      .normalizeEmail()
      .isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersControllers.createUser,
);

router.post("/login", usersControllers.login);

router.post("/autenticate", usersControllers.authenticate);

module.exports = router;
