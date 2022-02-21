import React from "react";
// import PropTypes from "prop-types";
import { Container, TextField } from "@mui/material";

function NewIngredient() {
  return (
    <Container>
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
    </Container>
  );
}

NewIngredient.propTypes = {};

export default NewIngredient;
