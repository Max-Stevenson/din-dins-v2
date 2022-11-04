/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
/* eslint-disable no-underscore-dangle */
import React, { useState, useContext, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import useHttpClient from "../../shared/hooks/http-hook";
import useFetch from "../../shared/hooks/useFetchHook";
import RecipesContext from "../../shared/context/RecipesContext";

function ViewRecipe() {
  const {
    error, isLoading, sendRequest, clearError
  } = useHttpClient();
  const [recipe, setRecipe] = useState();
  const { recipeId } = useParams();
  const { contextRecipes, setContextRecipes } = useContext(RecipesContext);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await sendRequest(
          "http://localhost:3000/api/v1/recipes"
        );

        setRecipe(response.data.filter((e) => e._id === recipeId)[0]);
        setContextRecipes(response.data);
      } catch (err) {

      }
    };
    if (!contextRecipes) {
      fetchRecipes();
    } else {
      console.log("setting");
      const selectedRecipe = contextRecipes.find((e) => e._id === recipeId);
      setRecipe(selectedRecipe);
      console.log(recipe.name);
    }
  }, []);

  if (recipe) {
    return <h2>{recipe.name}</h2>;
  }
  return <LoadingSpinner asOverlay loadingMessage="Loading Recipe..." />;

  // return <h2>test</h2>;
}
export default ViewRecipe;
