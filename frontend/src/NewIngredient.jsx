import React, { useState } from "react";
import validator from "validator";
import PropTypes from "prop-types";
import { Button, Container, TextField } from "@mui/material";

function NewIngredient({ handleAddIngredient }) {
  const [ingredientValid, setIngredientValid] = useState(false);

  const handleAdd = (event) => {
    event.preventDefault();
    const inputs = event.target.parentElement.querySelectorAll("input");
    const ingredient = {
      quantity: inputs[0].value,
      measure: inputs[1].value,
      ingredient: inputs[2].value
    };
    handleAddIngredient(ingredient);
  };

  return (
    <Container>
      <TextField
        required
        type="number"
        variant="outlined"
        InputLabelProps={{
          shrink: true
        }}
        label="Quantity"
      />
      <TextField required variant="outlined" label="Measure" />
      <TextField required variant="outlined" label="Ingredient" />
      <Button variant="contained" disabled={ingredientValid} onClick={(event) => handleAdd(event)}>Add Ingredient</Button>
    </Container>
  );
}

NewIngredient.propTypes = {
  handleAddIngredient: PropTypes.func.isRequired
};

export default NewIngredient;
