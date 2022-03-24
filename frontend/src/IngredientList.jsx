import React from "react";
import PropTypes from "prop-types";
import { Button, Container, Grid } from "@mui/material";
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
      <Grid container className="recipe-form__input-wrapper">
        <Grid item>
          <ul>
            {formState.ingredients.length > 0 && formState.ingredients.map((ingredient, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={`${ingredient.ingredident}${index}`}>
                <Ingredient
                  quantity={ingredient.quantity}
                  measure={ingredient.measure}
                  ingredient={ingredient.ingredient}
                  handleDelete={handleRemoveIngredient}
                />
              </li>
            ))}
          </ul>
        </Grid>
        <Grid item>
          <NewIngredient handleAddIngredient={handleAddIngredient} />
        </Grid>
        <Grid item xs={12} className="recipe-form__nav-button__container">
          <Button onClick={previousStep}>Previous</Button>
          <Button variant="contained" disabled={!formState.ingredients.length > 0} onClick={nextStep}>Continue</Button>
        </Grid>
      </Grid>
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
