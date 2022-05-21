import React, { useState } from "react";
import validator from "validator";
import FormInputs from "../../components/Recipes/FormInputs";
import GenericList from "../../components/Recipes/GenericList";
import NewIngredient from "../../components/Recipes/NewIngredient";
import NewGenericListItem from "../../components/Recipes/NewGenericListItem";
import GenericListItem from "../../components/Recipes/GenericListItem";
import RecipeReview from "../../components/Recipes/RecipeReview";
import "./RecipeForm.scss";

function RecipeForm() {
  const [formState, setFormState] = useState({
    step: 1,
    name: { value: "", isValid: false, errorMsg: "" },
    image: { preview: "", fileBase64: "" },
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
    } else {
      const value = event.target.checked;
      setFormState((previous) => ({
        ...previous,
        [input]: value
      }));
    }
  };

  const convertToBase64 = (file) => new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    FileReader.onerror = (err) => {
      reject(err);
    };
  });

  const handleFileUpload = async (event) => {
    // TODO filesize and type check
    const image = event.target.files[0];
    const base64Image = await convertToBase64(image);
    setFormState((previous) => ({
      ...previous,
      image: {
        preview: URL.createObjectURL(image),
        fileBase64: base64Image
      }
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
          listItemChild={<NewGenericListItem key={1} recipeList="tags" recipeListItem="tag" handleAddToList={handleAddToList} />}
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
