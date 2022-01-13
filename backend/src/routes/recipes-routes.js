// Contains only routing for recipes
const express = require("express");
const recipesController = require("../controllers/recipes-controller");
const HttpError = require("../models/http-error");

const router = express.Router();

router.get("/", recipesController.getAllRecipes);

router.get("/:id", recipesController.getRecipeById);

router.post("/", recipesController.createRecipe);

router.patch("/:id", recipesController.updateRecipe);

router.delete("/:id", recipesController.deleteRecipe);

module.exports = router;
