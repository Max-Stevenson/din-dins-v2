import React, { useState } from "react";
// import validator from "validator";
import PropTypes from "prop-types";
import { Button, Container, TextField } from "@mui/material";

function NewIngredient({ handleAddIngredient }) {
  const [ingredient, setIngredient] = useState({
    quantity: { value: 0, isValid: false, errorMsg: "" },
    measure: { value: "", isValid: false, errorMsg: "" },
    ingredient: { value: "", isValid: false, errorMsg: "" },
    isValid: false
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
        setIngredient({});
        break;
      case "measure":
        break;
      case "ingredient":
        break;

      default:
    }
    // setIngredient((previous) => ({ ...previous }));
  };

  const handleAdd = (event) => {
    event.preventDefault();
    handleAddIngredient(ingredient);
    // restore state to 0;
  };

  return (
    <Container>
      <TextField
        required
        type="number"
        onChange={(event) => { handleChange("quantity", event); }}
        variant="outlined"
        InputLabelProps={{
          shrink: true
        }}
        label="Quantity"
      />
      {ingredient.quantity.errorMsg && <p>{ingredient.quantity.errorMsg}</p>}
      <TextField required variant="outlined" label="Measure" />
      <TextField required variant="outlined" label="Ingredient" />
      <Button variant="contained" disabled={ingredient.isValid} onClick={(event) => handleAdd(event)}>Add Ingredient</Button>
    </Container>
  );
}

NewIngredient.propTypes = {
  handleAddIngredient: PropTypes.func.isRequired
};

export default NewIngredient;
