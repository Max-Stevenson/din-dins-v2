// Contains middleware logic for recipes routes.
const HttpError = require("../models/httpError");
const Recipe = require("../models/recipe");

const getAllRecipes = async (req, res, next) => {
  let recipes;

  try {
    recipes = await Recipe.find();
    res.status(200).send({ recipes });
  } catch (err) {
    next(new HttpError("Could not get recipes, please try again.", 500));
  }
};

const getRecipeById = async (req, res, next) => {
  const { id } = req.params;
  let recipe;

  try {
    recipe = await Recipe.findById(id);
    if (!recipe) {
      next(new HttpError("Recipe does not exist, please try again.", 404));
    }
    res.status(200).send({ recipe });
  } catch (err) {
    next(new HttpError("Could not get recipe, please try again.", 500));
  }
};

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
