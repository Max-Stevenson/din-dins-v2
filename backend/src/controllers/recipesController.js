// Contains middleware logic for recipes routes.
const HttpError = require("../models/httpError");
const Recipe = require("../models/recipe");

const getAllRecipes = (req, res, next) => {};

const getRecipeById = (req, res, next) => {};

const createRecipe = async (req, res, next) => {
  const recipe = new Recipe(req.body);
  try {
    await recipe.save();
  } catch (err) {}
  res.status(201).send({ recipe });
};

const updateRecipe = (req, res, next) => {};

const deleteRecipe = (req, res, next) => {};

exports.getAllRecipes = getAllRecipes;
exports.getRecipeById = getRecipeById;
exports.createRecipe = createRecipe;
exports.updateRecipe = updateRecipe;
exports.deleteRecipe = deleteRecipe;
