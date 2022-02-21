import React, { useState } from "react";
import FormInputs from "./FormInputs";
import IngredientList from "./IngredientList";
import DisplayWrapper from "./shared/DisplayWrapper";
// import PropTypes from "prop-types";

function RecipeForm() {
  const [formState, setFormState] = useState({
    step: 1,
    name: "",
    servings: 0,
    cookingTime: 0,
    isVegetarian: false,
    ingredients: [],
    method: [],
    tags: []
  });

  const nextStep = () => {
    const { step } = formState;
    setFormState((previous) => ({ ...previous, step: step + 1 }));
  };

  const previousStep = () => {
    const { step } = formState;
    setFormState((previous) => ({ ...previous, step: step - 1 }));
  };

  const handleChange = (input, event) => {
    setFormState((previous) => ({ ...previous, [input]: event.target.value }));
  };

  switch (formState.step) {
    case 1:
      return (
        <DisplayWrapper>
          <FormInputs
            nextStep={nextStep}
            handleChange={handleChange}
            formState={formState}
          />
        </DisplayWrapper>
      );
    case 2:
      return (
        <DisplayWrapper>
          <IngredientList
            previousStep={previousStep}
            nextStep={nextStep}
            handleChange={handleChange}
            formState={formState}
          />
        </DisplayWrapper>
      );
    case 3:
      return (
        <DisplayWrapper>
          <h2>Test</h2>
        </DisplayWrapper>
      );
    default:
      return (
        <div>
          <h1>Default</h1>
        </div>
      );
  }
}

// RecipeForm.propTypes = {

// };

export default RecipeForm;
