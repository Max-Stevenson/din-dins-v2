const mongoose = require("mongoose");

const { Schema } = mongoose;

const recipeSchema = new Schema({
  name: { type: String, required: true },
  servings: { type: Number, required: true },
  cookingTime: { type: Number, required: true },
  isVegetarian: { type: Boolean, required: true },
  ingredients: {
    _id: false,
    type: [
      {
        quantity: { type: Number, required: true },
        measure: { type: String, required: true },
        ingredient: { type: String, required: true },
      },
    ],
    required: true,
  },
  method: { type: [String], required: true },
  tags: { type: [String] },
});

module.exports = mongoose.model("Recipe", recipeSchema);
