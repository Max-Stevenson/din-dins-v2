const express = require("express");
const HttpError = require("../models/http-error");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "all recipes" });
});

router.get("/:id", (req, res) => {
  const recipe = {};

  if (!recipe) {
    const error = new HttpError("Could not find a recipe with the provided id.", 404);
    next(error);
  } else {
    res.json({ message: "single recipe" });
  }
});

module.exports = router;
