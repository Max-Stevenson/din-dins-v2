// Contains middleware logic for recipes routes.
const HttpError = require("../models/httpError");
const Recipe = require("../models/recipe");
const ValidationError = require("../models/validationError");

const getAllRecipes = async (_req, res, next) => {
  let recipes;

  try {
    recipes = await Recipe.find();
  } catch (err) {
    return next(new HttpError("Could not get recipes, please try again.", 500));
  }
  return res.status(200).send(recipes);
};

const getRecipeById = async (req, res, next) => {
  const { id } = req.params;
  let recipe;

  try {
    recipe = await Recipe.findById(id);
    if (!recipe) {
      return next(new HttpError("Recipe does not exist, please try again.", 404));
    }
  } catch (err) {
    return next(new HttpError("Could not get recipe, please try again.", 500));
  }
  return res.status(200).send({ recipe });
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
    return next(error);
  }
  return res.status(201).send(recipe);
};

const editRecipe = async (req, res, next) => {
  const {
    name, servings, cookingTime, isVegetarian, ingredients, method,
  } = req.body;
  const { id } = req.params;

  let recipe;
  try {
    recipe = await Recipe.findById(id);
    if (!recipe) {
      return next(
        new HttpError("Could not find recipe to edit, please try again.", 404),
      );
    }
  } catch (err) {
    return next(new HttpError("Could not edit recipe, please try again.", 500));
  }

  recipe.name = name;
  recipe.servings = servings;
  recipe.cookingTime = cookingTime;
  recipe.isVegetarian = isVegetarian;
  recipe.ingredients = ingredients;
  recipe.method = method;

  try {
    await recipe.save();
  } catch (err) {
    return next(new HttpError("Could not edit recipe, please try again.", 500));
  }

  return res.status(200).send(recipe);
};

const deleteRecipe = async (req, res, next) => {
  let recipe;
  const { id } = req.params;
  try {
    recipe = await Recipe.findByIdAndDelete(id);
    if (!recipe) {
      return next(
        new HttpError("Could not find recipe to delete, please try again.", 404),
      );
    }
  } catch (err) {
    return next(new HttpError("Could not delete recipe, please try again.", 500));
  }

  return res.status(200).send(recipe);
};

exports.getAllRecipes = getAllRecipes;
exports.getRecipeById = getRecipeById;
exports.createRecipe = createRecipe;
exports.editRecipe = editRecipe;
exports.deleteRecipe = deleteRecipe;
