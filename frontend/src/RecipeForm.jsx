/* eslint-disable max-len */
import React, { useState } from "react";
import validator from "validator";
import FormInputs from "./FormInputs";
import GenericList from "./GenericList";
import NewIngredient from "./NewIngredient";
import NewGenericListItem from "./NewGenericListItem";
import GenericListItem from "./GenericListItem";
import RecipeReview from "./RecipeReview";
import "./RecipeForm.scss";

function RecipeForm() {
  const [formState, setFormState] = useState({
    step: 1,
    name: { value: "", isValid: false, errorMsg: "" },
    image: null,
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

  const handleFileUpload = (event) => {
    const image = event.target.files[0];
    setFormState((previous) => ({
      ...previous,
      image: URL.createObjectURL(image)
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
          handleFileUpload={handleFileUpload}
        />
      );
    case 2:
      return (
        <GenericList
          isRequired
          listName="ingredients"
          listChildren={<GenericListItem listItem={{}} className="ingredients" handleDeleteFromList={genericDeleteMethod} />}
          // TODO extract out validators to make this generic too - replace with NewMethod.
          listItemChild={<NewIngredient handleAddToList={handleAddToList} />}
          previousStep={previousStep}
          nextStep={nextStep}
          handleDeleteFromList={genericDeleteMethod}
          formState={formState}
        />
      );
    case 3:
      return (
        <GenericList
          isRequired
          listName="method"
          listChildren={<GenericListItem listItem={{}} handleDeleteFromList={genericDeleteMethod} className="method" />}
          listItemChild={<NewGenericListItem key={0} componentType="method" handleAddToList={handleAddToList} />}
          previousStep={previousStep}
          nextStep={nextStep}
          handleDeleteFromList={genericDeleteMethod}
          formState={formState}
        />
      );
    case 4:
      return (
        <GenericList
          isRequired={false}
          listName="tags"
          listChildren={<GenericListItem listItem={{}} handleDeleteFromList={genericDeleteMethod} className="tags" />}
          listItemChild={<NewGenericListItem key={1} componentType="tags" handleAddToList={handleAddToList} />}
          previousStep={previousStep}
          nextStep={nextStep}
          handleDeleteFromList={genericDeleteMethod}
          formState={formState}
        />
      );
    case 5:
      return (
        <RecipeReview
          formState={formState}
          previousStep={previousStep}
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
