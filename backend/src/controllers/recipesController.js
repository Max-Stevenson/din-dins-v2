// Contains middleware logic for recipes routes.
const HttpError = require("../models/httpError");
const Recipe = require("../models/recipe");

const getAllRecipes = (req, res, next) => {};

const getRecipeById = (req, res, next) => {};

const createRecipe = async (req, res, next) => {
  try {
    const recipe = await new Recipe(req.body).save();
    res.status(201).send(recipe);
  } catch (err) {
    const errorDetails = {};
    Object.keys(err.errors).forEach((key) => {
      errorDetails[key] = err.errors[key].message;
    });
    const error = new HttpError("Error creating recipe", errorDetails, 400);
    next(error);
  }
};

const updateRecipe = (req, res, next) => {};

const deleteRecipe = (req, res, next) => {};

exports.getAllRecipes = getAllRecipes;
exports.getRecipeById = getRecipeById;
exports.createRecipe = createRecipe;
exports.updateRecipe = updateRecipe;
exports.deleteRecipe = deleteRecipe;
