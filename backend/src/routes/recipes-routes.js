const express = require("express");

const router = express.Router();

router.get("/api/v1/recipes", (req, res, next) => {
  res.json({ message: "working" });
});

module.exports = router;
