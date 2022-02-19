import React from "react";
import PropTypes from "prop-types";

function FormInputs({ nextStep, formState }) {
  return (
    <div>
      <h2>Its working</h2>
      <button type="button" onClick={nextStep}>Continue</button>
      <h2>{formState.servings}</h2>
    </div>
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
  }).isRequired
};

export default FormInputs;
