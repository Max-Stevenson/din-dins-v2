import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Container, TextField } from "@mui/material";

function NewIngredient({ handleAddIngredient }) {
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(false);

  const handleAdd = () => {
    
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
      <Button onClick={handleAddIngredient}>Add Ingredient</Button>
    </Container>
  );
}

NewIngredient.propTypes = {
  handleAddIngredient: PropTypes.func.isRequired
};

export default NewIngredient;
