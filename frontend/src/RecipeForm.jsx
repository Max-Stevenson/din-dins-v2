import React, { useState } from "react";
import validator from "validator";
import FormInputs from "./FormInputs";
import GenericList from "./GenericList";
import Ingredient from "./Ingredient";
import NewIngredient from "./NewIngredient";
import NewMethod from "./NewMethod";
import GenericListItem from "./GenericListItem";
// import Method from "./Method";
import "./RecipeForm.scss";

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
    } else if (input === "servings" || input === "cookingTime") {
      const value = parseInt(event.target.value, 10) || 0;
      if (value <= 0) {
        setFormState((previous) => ({
          ...previous,
          [input]: {
            value,
            isValid: false,
            errorMsg: "value cannot be a negative or 0"
          }
        }));
      } else {
        setFormState((previous) => ({
          ...previous,
          [input]: {
            value,
            isValid: true,
            errorMsg: ""
          }
        }));
      }
    }
  };

  // eslint-disable-next-line no-unused-vars
  const handleDeleteIngredient = (list, listItem) => {
    setFormState((previous) => ({
      ...previous,
      [list]: previous[list].filter(
        (element) => element.quantity !== listItem.quantity
          && element.ingredient !== listItem.ingredient
      )
    }));
  };

  // eslint-disable-next-line no-unused-vars
  const handleDeleteTagsOrMethods = (list, listItem) => {
    setFormState((previous) => ({
      ...previous,
      [list]: previous[list].filter(
        (element) => element[Object.keys(element)[0]] !== listItem[Object.keys(listItem)[0]]
      )
    }));
  };

  const genericDeleteMethod = (list, listItem) => {
    setFormState((previous) => ({
      ...previous,
      [list]: previous[list].filter(
        (element) => {
          for (let i = 0, j = Object.values(listItem).length; i < j; i += 1) {
            if (element[Object.keys(element)[i]] !== listItem[Object.keys(listItem)[i]]) {
              return true;
            }
          }
          return false;
        }
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
        <GenericList
          listName="ingredients"
          listChildren={<Ingredient />}
          listItemChild={<NewIngredient />}
          previousStep={previousStep}
          nextStep={nextStep}
          handleAddToList={handleAddToList}
          handleDeleteFromList={genericDeleteMethod}
          formState={formState}
        />
      );
    case 3:
      return (
        <GenericList
          listName="method"
          listChildren={<GenericListItem className="method" />}
          listItemChild={<NewMethod componentType="method" isRequired handleAddToList={handleAddToList} />}
          previousStep={previousStep}
          nextStep={nextStep}
          handleAddToList={handleAddToList}
          handleDeleteFromList={genericDeleteMethod}
          formState={formState}
        />
      );
    case 4:
      return (
        <GenericList
          listName="tags"
          listChildren={<GenericListItem className="tags" />}
          listItemChild={<NewMethod componentType="tags" isRequired={false} handleAddToList={handleAddToList} />}
          previousStep={previousStep}
          nextStep={nextStep}
          handleAddToList={handleAddToList}
          handleDeleteFromList={genericDeleteMethod}
          formState={formState}
        />
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
