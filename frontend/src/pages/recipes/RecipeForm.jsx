/* eslint-disable no-underscore-dangle */
import React, { useState, useCallback, useContext } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import validator from "validator";
import FormInputs from "../../components/Recipes/FormInputs";
import GenericList from "../../components/Recipes/GenericList";
import NewIngredient from "../../components/Recipes/NewIngredient";
import NewGenericListItem from "../../components/Recipes/NewGenericListItem";
import GenericListItem from "../../components/Recipes/GenericListItem";
import RecipeReview from "../../components/Recipes/RecipeReview";
import RecipesContext from "../../shared/context/RecipesContext";
import "./RecipeForm.scss";

function RecipeForm({ mode }) {
  const { recipeId } = useParams();
  const { contextRecipes } = useContext(RecipesContext);
  const recipe = mode === "edit" ? contextRecipes.find((r) => r._id === recipeId) : null;
  const initializeFormState = () => {
    if (recipe) {
      return {
        step: 1,
        name: { value: recipe.name, isValid: true, errorMsg: "" },
        image: { preview: recipe.image, file: {} },
        servings: { value: recipe.servings, isValid: true, errorMsg: "" },
        cookingTime: { value: recipe.cookingTime, isValid: true, errorMsg: "" },
        isVegetarian: recipe.isVegetarian,
        ingredients: recipe.ingredients,
        method: recipe.method,
        tags: recipe.tags
      };
    }
    return {
      step: 1,
      name: { value: "", isValid: false, errorMsg: "" },
      image: { preview: "", file: {} },
      servings: { value: 0, isValid: false, errorMsg: "" },
      cookingTime: { value: 0, isValid: false, errorMsg: "" },
      isVegetarian: false,
      ingredients: [],
      method: [],
      tags: []
    };
  };

  const [formState, setFormState] = useState(initializeFormState);

  const nextStep = useCallback(() => {
    const { step } = formState;
    setFormState((previous) => ({ ...previous, step: step + 1 }));
  }, [formState]);

  const previousStep = useCallback(() => {
    const { step } = formState;
    setFormState((previous) => ({ ...previous, step: step - 1 }));
  }, [formState]);

  const handleAddToList = useCallback((list, listItem) => {
    setFormState((previous) => ({
      ...previous,
      [list]: [...previous[list], listItem]
    }));
  }, []);

  const handleNameChange = (event) => {
    if (!validator.isEmpty(event.target.value.trim())) {
      setFormState((previous) => ({
        ...previous,
        name: {
          value: event.target.value,
          isValid: true,
          errorMsg: ""
        }
      }));
    } else {
      setFormState((previous) => ({
        ...previous,
        name: {
          value: event.target.value,
          isValid: false,
          errorMsg: "Recipe name cannot be empty"
        }
      }));
    }
  };

  const handleServingsOrCookingTimeChange = (input, event) => {
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
  };

  const handleIsVegetarianChange = (event) => {
    const value = event.target.checked;
    setFormState((previous) => ({
      ...previous,
      isVegetarian: value
    }));
  };

  const handleChange = (input, event) => {
    if (input === "name") {
      handleNameChange(event);
    } else if (input === "servings" || input === "cookingTime") {
      handleServingsOrCookingTimeChange(input, event);
    } else if (input === "isVegetarian") {
      handleIsVegetarianChange(event);
    }
  };

  const handleFileUpload = useCallback(async (event) => {
    const image = event.target.files[0];
    setFormState((previous) => ({
      ...previous,
      image: {
        preview: URL.createObjectURL(image),
        file: image
      }
    }));
  }, []);

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
          listItemChild={<NewGenericListItem key={0} recipeList="method" recipeListItem="method" handleAddToList={handleAddToList} />}
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

RecipeForm.propTypes = {
  mode: PropTypes.string.isRequired
};

export default RecipeForm;
