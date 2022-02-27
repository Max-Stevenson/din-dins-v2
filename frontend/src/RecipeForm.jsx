import React, { useState } from "react";
import FormInputs from "./FormInputs";
import IngredientList from "./IngredientList";
import DisplayWrapper from "./shared/DisplayWrapper";

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

  const handleAddToList = (list, listItem) => setFormState((previous) => ({
    ...previous, [list]: [...previous[list], listItem]
  }));

  const handleDeleteFromList = (list, listItem) => {
    setFormState((previous) => ({
      ...previous,
      [list]: previous[list].filter((element) => (
        element.quantity !== listItem.quantity && element.ingredient !== listItem.ingredient))
    }));
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
            handleAddToList={handleAddToList}
            handleDeleteFromList={handleDeleteFromList}
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

export default RecipeForm;
