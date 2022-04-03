/* eslint-disable quotes */
import React from "react";
import PropTypes from "prop-types";
import { Button, Grid, Container } from "@mui/material";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";

function MethodList({
  formState,
  nextStep,
  previousStep,
  handleAddToList,
  handleDeleteFromList
}) {
  const handleAddMethod = (method) => {
    handleAddToList("method", method);
  };

  const handleRemoveMethod = (method) => {
    handleDeleteFromList("method", method);
  };

  return (
    <Container>
      <Grid container rowSpacing={2} className="recipe-form__input-wrapper">
        <Grid item>
          <ul>
            {formState.method.length > 0 && formState.method.map((method, index) => (
            // eslint-disable-next-line react/no-array-index-key
              <li key={`${method.slice(method.length - 3)}${index}`}>
                <Method
                  methodStep={method}
                  handleDelete={handleRemoveMethod}
                />
              </li>
            ))}
          </ul>
        </Grid>
        <Grid item xs={12}>
          <NewMethod handleAddIngredient={handleAddMethod} />
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
            endIcon={<ArrowForwardIosOutlinedIcon />}
            disabled={!formState.method.length > 0}
            onClick={nextStep}
          >
            Continue

          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

MethodList.propTypes = {
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

export default MethodList;
