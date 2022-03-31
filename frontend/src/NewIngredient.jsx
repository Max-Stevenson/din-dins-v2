import React, { useState } from "react";
import validator from "validator";
import PropTypes from "prop-types";
import {
  Button, Container, Grid, TextField
} from "@mui/material";

function NewIngredient({ handleAddIngredient }) {
  const [ingredient, setIngredient] = useState({
    quantity: { value: 0, isValid: false, errorMsg: "" },
    measure: { value: "", isValid: false, errorMsg: "" },
    ingredient: { value: "", isValid: false, errorMsg: "" }
  });

  const handleChange = (inputName, event) => {
    const inputValue = event.target.value;

    switch (inputName) {
      case "quantity":
        if (parseInt(inputValue, 10) > 0) {
          setIngredient((previous) => ({
            ...previous,
            [inputName]: {
              value: parseInt(inputValue, 10),
              isValid: true,
              errorMsg: ""
            }
          }));
        } else {
          setIngredient((previous) => ({
            ...previous,
            [inputName]: {
              value: parseInt(inputValue, 10),
              isValid: false,
              errorMsg: "value cannot be a negative or 0"
            }
          }));
        }
        break;
      case "measure":
      case "ingredient":
        if (validator.isEmpty(inputValue.trim())) {
          setIngredient((previous) => ({
            ...previous,
            [inputName]: {
              value: inputValue.trim(),
              isValid: false,
              errorMsg: `${inputName} cannot be empty`
            }
          }));
        } else {
          setIngredient((previous) => ({
            ...previous,
            [inputName]: {
              value: inputValue.trim(),
              isValid: true,
              errorMsg: ""
            }
          }));
        }
        break;
      default:
    }
  };

  const handleAdd = (event) => {
    event.preventDefault();
    handleAddIngredient({
      quantity: ingredient.quantity.value,
      measure: ingredient.measure.value,
      ingredient: ingredient.ingredient.value
    });
    setIngredient({
      quantity: { value: 0, isValid: false, errorMsg: "" },
      measure: { value: "", isValid: false, errorMsg: "" },
      ingredient: { value: "", isValid: false, errorMsg: "" }
    });
    const inputs = document.querySelectorAll("input");
    for (let i = 0, j = inputs.length; i < j; i += 1) {
      if (i === 0) {
        inputs[i].value = 0;
      } else {
        inputs[i].value = "";
      }
    }
  };

  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <TextField
            required
            autoComplete="off"
            type="number"
            onChange={(event) => {
              handleChange("quantity", event);
            }}
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
            label="Quantity"
          />
          {ingredient.quantity.errorMsg && <p>{ingredient.quantity.errorMsg}</p>}
          <TextField
            onChange={(event) => {
              handleChange("measure", event);
            }}
            required
            autoComplete="off"
            variant="outlined"
            label="Measure"
          />
          {ingredient.measure.errorMsg && <p>{ingredient.measure.errorMsg}</p>}
          <TextField
            onChange={(event) => {
              handleChange("ingredient", event);
            }}
            required
            autoComplete="off"
            variant="outlined"
            label="Ingredient"
          />
          {ingredient.ingredient.errorMsg && <p>{ingredient.ingredient.errorMsg}</p>}
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            disabled={
          !ingredient.quantity.isValid
          || !ingredient.measure.isValid
          || !ingredient.ingredient.isValid
        }
            onClick={(event) => handleAdd(event)}
          >
            Add Ingredient
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

NewIngredient.propTypes = {
  handleAddIngredient: PropTypes.func.isRequired
};

export default NewIngredient;
