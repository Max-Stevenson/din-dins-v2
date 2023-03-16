const mongoose = require("mongoose");

const { Schema } = mongoose;

const recipeSchema = new Schema({
  name: {
    type: String,
    required: { value: true, message: "Name cannot be empty" },
    trim: true,
  },
  image: {
    type: String,
  },
  servings: {
    type: Number,
    required: true,
    min: [1, "Must be at least one serving."],
  },
  cookingTime: {
    type: Number,
    required: true,
    min: [1, "Cooking time must be at lease one minute."],
  },
  isVegetarian: { type: Boolean, required: true },
  ingredients: {
    _id: false,
    type: [
      {
        quantity: {
          type: Number,
          required: true,
          min: [1, "Ingredient quantity cannot be zero."],
        },
        measure: { type: String, required: true, trim: true },
        ingredient: { type: String, required: true, trim: true },
      },
    ],
    required: true,
  },
  method: {
    _id: false,
    type: [
      {
        method: {
          type: String,
          required: { value: true, message: "Method cannot be empty" },
          trim: true,
        },
      },
    ],
    required: true,
  },
  tags: {
    _id: false,
    type: [
      {
        tag: {
          type: String,
          required: { value: true, message: "Tag cannot be empty" },
          trim: true,
        },
      },
    ],
  },
  metadata: {
    _id: false,
    dateLastConsumed: {
      type: Date,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
});

module.exports = mongoose.model("Recipe", recipeSchema);
