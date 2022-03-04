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
          defaultValue={formState.name}
          label="Recipe Name"
          onChange={(event) => handleChange("name", event)}
          variant="outlined"
          autoComplete="off"
        />
      </Grid>
      <Grid item>
        <TextField
          defaultValue={formState.servings}
          label="Servings"
          type="number"
          variant="outlined"
          InputLabelProps={{
            shrink: true
          }}
          onChange={(event) => handleChange("servings", event)}
        />
      </Grid>
      <Grid item>
        <TextField
          type="number"
          defaultValue={formState.cookingTime}
          label="Cooking Time"
          onChange={(event) => handleChange("cookingTime", event)}
          variant="outlined"
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
    name: PropTypes.string,
    servings: PropTypes.number,
    cookingTime: PropTypes.number,
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
