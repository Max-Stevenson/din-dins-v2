import React from "react";
import PropTypes from "prop-types";
import { Button, Container } from "@mui/material";
import NewIngredient from "./NewIngredient";

function IngredientList({
  formState,
  nextStep,
  previousStep,
  handleAddToList,
  handleDeleteFromList
}) {
  const handleAddIngredient = (ingredient) => {
    handleAddToList("ingredients", ingredient);
  };

  return (
    <Container>
      <ol>
        {formState.ingredients.map((ingredient) => (
          <li>
            {ingredient.quantity}
            {" "}
            {ingredient.measure}
            {" "}
            {ingredient.ingredient}
            <Button onClick={() => { handleDeleteFromList(); }} />
          </li>
        ))}
      </ol>
      <NewIngredient handleAddIngredient={handleAddIngredient} />
      <Button onClick={nextStep}>Continue</Button>
      <Button onClick={previousStep}>Previous</Button>
    </Container>
  );
}

IngredientList.propTypes = {
  nextStep: PropTypes.func.isRequired,
  previousStep: PropTypes.func.isRequired,
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
  handleAddToList: PropTypes.func.isRequired,
  handleDeleteFromList: PropTypes.func.isRequired
};

export default IngredientList;
