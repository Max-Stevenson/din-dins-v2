const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {
  res.json({ message: "new user created" });
});

router.get("/me", (req, res) => {
  res.json({ message: "my profile" });
});

router.post("/login", (req, res) => {
  res.json({ message: "login" });
});

router.post("/logout", (req, res) => {
  res.json({ message: "logout" });
});

module.exports = router;
