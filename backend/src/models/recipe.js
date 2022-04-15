const mongoose = require("mongoose");
const validator = require("validator");

const { Schema } = mongoose;

const recipeSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (validator.isEmpty(value)) {
        throw new Error("Name cannot be empty");
      }
    },
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
          required: true,
          trim: true,
          validate(value) {
            if (validator.isEmpty(value)) {
              throw new Error("Method cannot be empty");
            }
          },
        },
      }],
    required: true,
  },
  tags: {
    _id: false,
    type: [
      {
        tag: {
          type: String,
          required: true,
          trim: true,
          validate(value) {
            if (validator.isEmpty(value)) {
              throw new Error("Tag cannot be empty");
            }
          },
        },
      }],
  },
});

module.exports = mongoose.model("Recipe", recipeSchema);
