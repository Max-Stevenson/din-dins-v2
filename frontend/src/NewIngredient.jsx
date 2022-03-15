import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Container, TextField } from "@mui/material";

function NewIngredient({ handleAddIngredient }) {
  const [error, setError] = useState(false);

  const handleAdd = (event) => {
    event.preventDefault();
    const inputs = event.target.parentElement.querySelectorAll("input");
    const ingredient = {
      quantity: parseInt(inputs[0].value, 10),
      measure: inputs[1].value,
      ingredient: inputs[2].value
    };
    setError(handleAddIngredient(ingredient));
  };

  return (
    <Container>
      {error && <p>{error}</p>}
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
      <Button onClick={(event) => handleAdd(event)}>Add Ingredient</Button>
    </Container>
  );
}

NewIngredient.propTypes = {
  handleAddIngredient: PropTypes.func.isRequired
};

export default NewIngredient;
