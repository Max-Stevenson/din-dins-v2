// Contains only routing for recipes
const express = require("express");
const recipesController = require("../controllers/recipesController");
const checkAuth = require("../middleware/check-auth");
const upload = require("../middleware/image-upload");

const router = express.Router();

router.use(checkAuth);
router.get("/", recipesController.getAllRecipes);
router.get("/:id", recipesController.getRecipeById);
router.post("/", recipesController.createRecipe);
router.post("/upload", upload.single("image"), recipesController.uploadImage);
router.put("/:id", recipesController.editRecipe);
router.delete("/:id", recipesController.deleteRecipe);

module.exports = router;
