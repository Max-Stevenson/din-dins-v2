import React from "react";
import Button from "@mui/material/Button";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import PropTypes from "prop-types";
import {
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Grid
} from "@mui/material";
import "./FormInputs.scss";

function FormInputs({ nextStep, formState, handleChange }) {
  return (
    <Grid container className="recipe-form__input-wrapper">
      <Grid item xs={12}>
        <TextField
          required
          defaultValue={formState.name.value}
          label="Recipe Name"
          onChange={(event) => handleChange("name", event)}
          variant="outlined"
          autoComplete="off"
          helperText="Please enter a name for this recipe."
        />
        {formState.name.errorMsg && <h2>{formState.name.errorMsg}</h2>}
      </Grid>
      <Grid item xs={12}>
        <TextField
          defaultValue={formState.servings.value}
          label="Servings"
          required
          type="number"
          variant="outlined"
          InputLabelProps={{
            shrink: true
          }}
          onChange={(event) => handleChange("servings", event)}
          helperText="How many servings does this recipe make?"
        />
      </Grid>
      <Grid item>
        <TextField
          type="number"
          required
          defaultValue={formState.cookingTime.value}
          label="Cooking Time"
          onChange={(event) => handleChange("cookingTime", event)}
          variant="outlined"
          helperText="How long does it take to make this recipe?"
        />
      </Grid>
      <Grid item>
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="Meal is Vegeterain" />
        </FormGroup>
      </Grid>
      <Grid item xs={12} className="recipe-form__grid-container--relative">
        <Button
          className="recipe-form__continue-button recipe-form__continue-button--absolute"
          variant="contained"
          endIcon={<ArrowForwardIosOutlinedIcon />}
          onClick={nextStep}
          disabled={
            formState.name.isValid
            && formState.servings.isValid
            && formState.cookingTime.isValid
          }
        >
          Continue
        </Button>
      </Grid>
    </Grid>
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
    method: PropTypes.arrayOf(PropTypes.string),
    tags: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  handleChange: PropTypes.func.isRequired
};

export default FormInputs;
