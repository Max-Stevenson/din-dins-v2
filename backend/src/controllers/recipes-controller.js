// Contains middleware logic for recipes routes.
const HttpError = require("../models/http-error");
const Recipe = require("../models/recipe");

const getAllRecipes = ((req, res, next) => {

});

const getRecipeById = ((req, res, next) => {

});


const createRecipe = ((req, res, next) => {
  const recipe = new Recipe(req.body);
  
});

const updateRecipe = ((req, res, next) => {

});

const deleteRecipe =((req, res, next) => {

});

exports.getAllRecipes = getAllRecipes;
exports.getRecipeById = getRecipeById;
exports.createRecipe = createRecipe;
exports.updateRecipe = updateRecipe;
exports.deleteRecipe = deleteRecipe;