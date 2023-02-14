// Contains only routing for recipes
const express = require("express");
const multer = require("multer");
const recipesController = require("../controllers/recipesController");
const checkAuth = require("../middleware/check-auth");
const fileUpload = require("../middleware/image-upload");

const router = express.Router();

router.use(checkAuth);
router.get("/", recipesController.getAllRecipes);
router.get("/:id", recipesController.getRecipeById);
router.post("/", recipesController.createRecipe);
router.post("/upload", fileUpload.single("image"), (req, res, next) => {
  const { file } = req;
  if (!file) {
    return res.status(400).json({ message: "No image provided" });
  }
  return next();
}, (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({ message: "File size exceeds limit" });
    }
    return res.status(400).json({ message: "Bad request" });
  } if (err) {
    return res.status(500).json({ message: "Server error" });
  }
  return next();
}, recipesController.uploadImage);
router.put("/:id", recipesController.editRecipe);
router.delete("/:id", recipesController.deleteRecipe);

module.exports = router;
