import React from "react";
import PropTypes from "prop-types";
import { Button, Container } from "@mui/material";
import NewIngredient from "./NewIngredient";
import Ingredient from "./Ingredient";

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

  const handleRemoveIngredient = (ingredient) => {
    handleDeleteFromList("ingredients", ingredient);
  };

  return (
    <Container>
      <ul>
        {formState.ingredients.length > 0 && formState.ingredients.map((ingredient, index) => (
          <li>
            <Ingredient
              // eslint-disable-next-line react/no-array-index-key
              key={`${ingredient.ingredident}${index}`}
              quantity={ingredient.quantity}
              measure={ingredient.measure}
              ingredient={ingredient.ingredient}
              handleDelete={handleRemoveIngredient}
            />
          </li>
        ))}
      </ul>
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
    name: PropTypes.shape({
      value: PropTypes.string,
      isValid: PropTypes.bool,
      errorMsg: PropTypes.string
    }),
    servings: PropTypes.shape({
      value: PropTypes.number,
      isValid: PropTypes.bool,
      errorMsg: PropTypes.string
    }),
    cookingTime: PropTypes.shape({
      value: PropTypes.number,
      isValid: PropTypes.bool,
      errorMsg: PropTypes.string
    }),
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
