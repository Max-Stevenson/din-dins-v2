const HttpError = require("../models/httpError");
const Recipe = require("../models/recipe");

const handleErrors = (err, res) => {
  let status = 500;
  let message = "An unknown error occurred";
  if (err instanceof HttpError) {
    status = err.status;
    message = err.message;
  } else if (err.name === "ValidationError") {
    status = 400;
    message = "Invalid input";
    const errorDetails = {};
    Object.keys(err.errors).forEach((key) => {
      errorDetails[key] = err.errors[key].message;
    });
    res.status(status).json({
      message,
      errors: errorDetails,
    });
    return;
  }
  res.status(status).json({ message });
};

const getAllRecipes = async (_req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).send(recipes);
  } catch (err) {
    handleErrors(new HttpError("Could not get recipes, please try again.", 500), res);
  }
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      throw new HttpError("Recipe does not exist, please try again.", 404);
    }
    res.status(200).send(recipe);
  } catch (err) {
    handleErrors(err, res);
  }
};

const createRecipe = async (req, res) => {
  const recipe = new Recipe(req.body);
  try {
    await recipe.save();
    res.status(201).send(recipe);
  } catch (err) {
    handleErrors(err, res);
  }
};

const uploadImage = async (req, res) => {
  const { file } = req;
  const imageUrl = `${req.protocol}://${req.get("host")}/images/${file.filename}`;
  res.status(201).json({ imageUrl });
};

const editRecipe = async (req, res) => {
  const {
    name, image, servings, cookingTime, isVegetarian, ingredients, method,
  } = req.body;
  const { id } = req.params;
  try {
    const recipe = await Recipe.findByIdAndUpdate(id, {
      name, image, servings, cookingTime, isVegetarian, ingredients, method,
    }, { new: true, runValidators: true });
    if (!recipe) {
      throw new HttpError("Could not find recipe to edit, please try again.", 404);
    }
    res.status(200).send(recipe);
  } catch (err) {
    handleErrors(err, res);
  }
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findByIdAndDelete(id);
    if (!recipe) {
      throw new HttpError("Could not find recipe to delete, please try again.", 404);
    }
    res.status(200).send(recipe);
  } catch (err) {
    handleErrors(new HttpError("Could not delete recipe, please try again.", 500), res);
  }
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  uploadImage,
  editRecipe,
  deleteRecipe,
};
