// Contains middleware logic for recipes routes.
const HttpError = require("../models/httpError");
const Recipe = require("../models/recipe");
const ValidationError = require("../models/validationError");

const getAllRecipes = async (_req, res, next) => {
  let recipes;

  try {
    recipes = await Recipe.find();
  } catch (err) {
    next(new HttpError("Could not get recipes, please try again.", 500));
  }
  res.status(200).send({ recipes });
};

const getRecipeById = async (req, res, next) => {
  const { id } = req.params;
  let recipe;

  try {
    recipe = await Recipe.findById(id);
    if (!recipe) {
      next(new HttpError("Recipe does not exist, please try again.", 404));
    }
  } catch (err) {
    next(new HttpError("Could not get recipe, please try again.", 500));
  }
  res.status(200).send({ recipe });
};

const createRecipe = async (req, res, next) => {
  const recipe = new Recipe(req.body);

  try {
    await recipe.save();
  } catch (err) {
    const errorDetails = {};
    Object.keys(err.errors).forEach((key) => {
      errorDetails[key] = err.errors[key].message;
    });
    const error = new ValidationError("Invalid input", errorDetails, 400);
    next(error);
  }
  res.status(201).send(recipe);
};

const updateRecipe = (req, res, next) => {};

const deleteRecipe = async (req, res, next) => {
  let recipe;
  const { id } = req.params;
  try {
    recipe = await Recipe.findByIdAndDelete(id);
    if (!recipe) {
      next(
        new HttpError("Could not find recipe to delete, please try again.", 404)
      );
    }
  } catch (err) {
    next(new HttpError("Could not delete recipe, please try again.", 500));
  }

  res.status(200).send(recipe);
};

exports.getAllRecipes = getAllRecipes;
exports.getRecipeById = getRecipeById;
exports.createRecipe = createRecipe;
exports.updateRecipe = updateRecipe;
exports.deleteRecipe = deleteRecipe;
