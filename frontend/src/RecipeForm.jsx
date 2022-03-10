import React, { useState } from "react";
import validator from "validator";
import FormInputs from "./FormInputs";
import IngredientList from "./IngredientList";
import DisplayWrapper from "./shared/DisplayWrapper";

function RecipeForm() {
  const [formState, setFormState] = useState({
    step: 1,
    name: { value: "", isValid: false, errorMsg: "" },
    servings: { value: 0, isValid: false, errorMsg: "" },
    cookingTime: { value: 0, isValid: false, errorMsg: "" },
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

  const handleAddToList = (list, listItem) => setFormState((previous) => ({
    ...previous,
    [list]: [...previous[list], listItem]
  }));

  const handleChange = (input, event) => {
    if (input === "name") {
      if (!validator.isEmpty(event.target.value.trim())) {
        setFormState((previous) => ({
          ...previous,
          [input]: {
            value: event.target.value,
            isValid: true,
            errorMsg: ""
          }
        }));
      } else {
        setFormState((previous) => ({
          ...previous,
          [input]: {
            value: event.target.value,
            isValid: false,
            errorMsg: "Recipe name cannot be empty"
          }
        }));
      }
    } else if (input === "servings" || input === "cooking time") {
      if (parseInt(event.target.value, 10) < 0) {
        setFormState((previous) => ({
          ...previous,
          [input]: {
            value: parseInt(event.target.value, 10),
            isValid: false,
            errorMsg: `${input} cannot be a negative number`
          }
        }));
      } else {
        setFormState((previous) => ({
          ...previous,
          [input]: {
            value: parseInt(event.target.value, 10),
            isValid: true,
            errorMsg: ""
          }
        }));
      }
    }
  };

  const handleDeleteFromList = (list, listItem) => {
    setFormState((previous) => ({
      ...previous,
      [list]: previous[list].filter(
        (element) => element.quantity !== listItem.quantity
          && element.ingredient !== listItem.ingredient
      )
    }));
  };

  switch (formState.step) {
    case 1:
      return (
        <FormInputs
          nextStep={nextStep}
          handleChange={handleChange}
          formState={formState}
        />
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
