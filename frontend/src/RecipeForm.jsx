import React, { useState } from "react";
// import PropTypes from "prop-types";

function RecipeForm() {
  const [formState, setFormState] = useState({
    step: 1,
    name: "Default",
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

  // const handleChange = (input, event) => {
  //   setFormState((previous) => ({ ...previous, [input]: event.target }));
  // };

  return (
    <div>
      <h2>{formState.step}</h2>
      <h2>{formState.name}</h2>
      <button type="button" onClick={nextStep}>Press me</button>
      <button type="button" onClick={previousStep}>Press me</button>
    </div>
  );
}

// RecipeForm.propTypes = {

// };

export default RecipeForm;
