import React, { useState } from "react";
import validator from "validator";
import PropTypes from "prop-types";
import {
  Button, Grid, TextField
} from "@mui/material";
import "./NewIngredient.scss";

function NewIngredient({ handleAddToList }) {
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
    handleAddToList("ingredients", {
      quantity: ingredient.quantity.value,
      measure: ingredient.measure.value,
      ingredient: ingredient.ingredient.value
    });
    setIngredient({
      quantity: { value: "", isValid: false, errorMsg: "" },
      measure: { value: "", isValid: false, errorMsg: "" },
      ingredient: { value: "", isValid: false, errorMsg: "" }
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
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
          value={ingredient.quantity.value}
          error={!ingredient.quantity.isValid && ingredient.quantity.errorMsg !== ""}
          helperText={!ingredient.quantity.isValid && ingredient.quantity.errorMsg}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          onChange={(event) => {
            handleChange("measure", event);
          }}
          required
          autoComplete="off"
          variant="outlined"
          label="Measure"
          value={ingredient.measure.value}
          error={!ingredient.measure.isValid && ingredient.measure.errorMsg !== ""}
          helperText={!ingredient.measure.isValid && ingredient.measure.errorMsg}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          onChange={(event) => {
            handleChange("ingredient", event);
          }}
          required
          className="new-ingreident__ingredient-field"
          autoComplete="off"
          variant="outlined"
          label="Ingredient"
          value={ingredient.ingredient.value}
          helperText={!ingredient.ingredient.isValid && ingredient.ingredient.errorMsg}
        />
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
  );
}

NewIngredient.propTypes = {
  handleAddToList: PropTypes.func.isRequired
};

export default NewIngredient;
