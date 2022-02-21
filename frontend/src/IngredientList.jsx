import React, { useState } from "react";
import PropTypes from "prop-types";
import NewIngredient from "./NewIngredient";

function IngredientList({
  formState, nextStep, previousStep, handleChange
}) {
  const [ingredients, setIngredients] = useState(formState.ingredients);
  return (
    <NewIngredient />
  );
}

IngredientList.propTypes = {
  nextStep: PropTypes.func.isRequired,
  formState: PropTypes.shape({
    name: PropTypes.string,
    servings: PropTypes.number,
    cookingTime: PropTypes.number,
    isVegetarian: PropTypes.bool,
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        quantity: PropTypes.number,
        measure: PropTypes.string,
        ingredient: PropTypes.string
      })
    ),
    method: PropTypes.arrayOf(PropTypes.string),
    tags: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  handleChange: PropTypes.func.isRequired
};

export default IngredientList;
