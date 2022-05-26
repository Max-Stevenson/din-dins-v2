// Contains only routing for recipes
const express = require("express");
// const cache = require("../routeCache");
// const multer = require("multer");
const recipesController = require("../controllers/recipesController");

const router = express.Router();
// const upload = multer({});

router.get("/", recipesController.getAllRecipes);
router.get("/:id", recipesController.getRecipeById);
router.post("/", recipesController.createRecipe);
router.put("/:id", recipesController.editRecipe);
router.delete("/:id", recipesController.deleteRecipe);

module.exports = router;
