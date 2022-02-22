import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Container, TextField } from "@mui/material";

function NewIngredient({ handleAddIngredient }) {
  const [error, setError] = useState(false);

  const handleAdd = (event) => {
    event.preventDefault();
    console.log(event.target.parentElement.querySelectorAll("input"));
    const ingredient = {
      quantity: document.querySelector("#mui-10").value,
      measure: "cups",
      ingredient: "test"
    };
    setError(handleAddIngredient(ingredient));
  };

  return (
    <Container>
      {error && <p>{error}</p>}
      <TextField
        type="number"
        variant="outlined"
        InputLabelProps={{
          shrink: true
        }}
        label="Quantity"
      />
      <TextField variant="outlined" label="Measure" />
      <TextField variant="outlined" label="Ingredient" />
      <Button onClick={(event) => handleAdd(event)}>Add Ingredient</Button>
    </Container>
  );
}

NewIngredient.propTypes = {
  handleAddIngredient: PropTypes.func.isRequired
};

export default NewIngredient;
