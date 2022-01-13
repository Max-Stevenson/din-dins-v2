// Contains middleware logic for recipes routes.
const HttpError = require("../models/http-error");

const getAllRecipes = (() => {

});

const getRecipeById = ((req, res, next) => {
  const recipeId = req.params.id;
  // database lookup
  const recipe = {};
  if (!recipe) {
    const error = new HttpError("Could not find a recipe with the provided id.", 404);
    next(error);
  } else {
    res.json({ message: "single recipe" });
  }
});


const createRecipe = (() => {

});

const updateRecipe = (() => {

});

const deleteRecipe =(() => {

});

exports.getAllRecipes = getAllRecipes;
exports.getRecipeById = getRecipeById;
exports.createRecipe = createRecipe;
exports.updateRecipe = updateRecipe;
exports.deleteRecipe = deleteRecipe;