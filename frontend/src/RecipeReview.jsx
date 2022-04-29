import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Grid,
  Container
} from "@mui/material";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";

function RecipeReview({ formState, previousStep }) {
  const [tabValue, setTabValue] = useState(0);
  const handleChange = (_event, value) => {
    setTabValue(value);
  };

  const submitRecipe = () => {

  };

  return (
    <Container>
      <Grid container className="recipe-form__input-wrapper">
        <Grid item xs={12}>
          <h3>{formState.name.value}</h3>
        </Grid>
        <Grid item xs={6}>
          <h5>
            Servings:
            {" "}
            {formState.servings.value}
          </h5>
          <Grid item xs={6}>
            <h5>
              Cooking Time:
              {" "}
              {formState.cookingTime.value}
            </h5>
          </Grid>
          <Grid item xs={12} className="recipe-form__nav-button__container">
            <Button
              variant="contained"
              startIcon={<ArrowBackIosOutlinedIcon />}
              onClick={previousStep}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              onClick={submitRecipe}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

RecipeReview.propTypes = {
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
    method: PropTypes.arrayOf(PropTypes.shape({ method: PropTypes.string })),
    tags: PropTypes.arrayOf(PropTypes.shape({ tag: PropTypes.string }))
  }).isRequired,
  previousStep: PropTypes.func.isRequired
};

export default RecipeReview;
