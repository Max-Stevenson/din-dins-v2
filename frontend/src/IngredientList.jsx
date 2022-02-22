import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Container } from "@mui/material";
import NewIngredient from "./NewIngredient";

function IngredientList({
  formState,
  nextStep,
  previousStep,
  handleAddToList
}) {
  // eslint-disable-next-line no-unused-vars
  const [ingredients, setIngredients] = useState(formState.ingredients);

  const handleAddIngredient = (ingredient) => {
    console.log(ingredient);
    handleAddToList("ingredients", ingredient);
  };

  return (
    <Container>
      {ingredients}
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
  handleAddToList: PropTypes.func.isRequired
};

export default IngredientList;
