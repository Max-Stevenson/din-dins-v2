import React, { useState } from "react";
import FormInputs from "./FormInputs";
import FormList from "./FormList";
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
    setFormState((previous) => ({ ...previous, [input]: event.target }));
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
          <FormList
            previousStep={previousStep}
            nextStep={nextStep}
            handleChange={handleChange}
            formState={formState}
          />
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
