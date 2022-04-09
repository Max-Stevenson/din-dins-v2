import React from "react";
import Button from "@mui/material/Button";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import PropTypes from "prop-types";
import {
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Grid,
  Container
} from "@mui/material";
import "./FormInputs.scss";

function FormInputs({ nextStep, formState, handleChange }) {
  return (
    <Container>
      <Grid container className="recipe-form__input-wrapper">
        <Grid item xs={12}>
          <TextField
            required
            defaultValue={formState.name.value}
            label="Recipe Name"
            onChange={(event) => handleChange("name", event)}
            variant="outlined"
            autoComplete="off"
            helperText={formState.name.errorMsg || "Please enter a name for this recipe."}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            defaultValue={formState.servings.value}
            label="Servings"
            required
            autoComplete="off"
            type="number"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
            onChange={(event) => handleChange("servings", event)}
            helperText={formState.servings.errorMsg || "How many servings does this recipe make?"}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="number"
            required
            autoComplete="off"
            defaultValue={formState.cookingTime.value}
            label="Cooking Time"
            onChange={(event) => handleChange("cookingTime", event)}
            variant="outlined"
            helperText={formState.cookingTime.errorMsg || "How long does it take to make this recipe?"}
          />
        </Grid>
        <Grid item xs={12}>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Meal is Vegeterain" />
          </FormGroup>
        </Grid>
        <Grid item xs={12} className="recipe-form__nav-button__container">
          <Button
            className="nav-button__end"
            variant="contained"
            endIcon={<ArrowForwardIosOutlinedIcon />}
            onClick={nextStep}
            disabled={
            !formState.name.isValid
            || !formState.servings.isValid
            || !formState.cookingTime.isValid
          }
          >
            Continue
          </Button>
        </Grid>

      </Grid>
    </Container>

  );
}

FormInputs.propTypes = {
  nextStep: PropTypes.func.isRequired,
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
  handleChange: PropTypes.func.isRequired
};

export default FormInputs;
