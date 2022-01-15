const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  name: String,
  servings: Number,
  cookingTime: Number,
  isVegetarian: Boolean,
  ingredients: [{
    quantity: Number,
    measure: String,
    ingredient: String
  }],
  method: [String],
  tags: [String],
});

module.exports = mongoose.model("Recipe", recipeSchema);
