// recipesRoutes.js
const express = require("express");
const recipesController = require("../controllers/recipesController");
const checkAuth = require("../middleware/check-auth");
const fileUpload = require("../middleware/image-upload");
const handleFileUploadErrors = require("../middleware/handle-file-upload-errors");

const router = express.Router();

router.use(checkAuth);
router.get("/", recipesController.getAllRecipes);
router.get("/:id", recipesController.getRecipeById);
router.post("/", recipesController.createRecipe);
router.post("/upload", fileUpload.single("image"), (req, res, next) => {
  const { file } = req;
  if (!file) {
    // Use the default image if no image is provided
    req.file = {
      filename: "recipe.jpg",
      path: "/images/recipe.jpg",
      destination: "C:/Projects/din-dins-v2/frontend/public/images",
      mimetype: "image/jpeg",
      isEmpty: true,
    };
  }
  return next();
}, handleFileUploadErrors, recipesController.uploadImage);
router.put("/:id", recipesController.editRecipe);
router.delete("/:id", recipesController.deleteRecipe);

module.exports = router;
