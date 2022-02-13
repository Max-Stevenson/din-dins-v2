import React from "react";
import PropTypes, { string } from "prop-types";

function RecipeItem({ recipeItem }) {
  return (
    <div className="recipe-item__wrapper" />
  );
}

RecipeItem.propTypes = {
  recipeItem: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    servings: PropTypes.number,
    cookingTime: PropTypes.number,
    isVegetarian: PropTypes.bool,
    ingredients: PropTypes.arrayOf(PropTypes.shape({
      quantity: PropTypes.number,
      measure: PropTypes.string,
      ingredient: PropTypes.string
    })),
    method: PropTypes.arrayOf(string),
    tags: PropTypes.arrayOf(string),
    __v: PropTypes.string
  }).isRequired
};

export default RecipeItem;
