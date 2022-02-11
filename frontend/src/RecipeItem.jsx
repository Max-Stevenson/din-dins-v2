import React from "react";
import PropTypes from "prop-types";

function RecipeItem({ recipeItem }) {
  return (
    <div className="recipe-item__wrapper" />
  );
}

RecipeItem.propTypes = {
  recipeItem: PropTypes.shape({
    _id: PropTypes.string
  }).isRequired
};

export default RecipeItem;
