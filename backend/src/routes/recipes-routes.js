const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "all recipes" });
});

router.get("/:id", (req, res) => {
  res.json({ message: "single recipe" });
});

module.exports = router;
