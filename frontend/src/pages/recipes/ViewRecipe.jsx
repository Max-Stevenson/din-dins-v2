/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
/* eslint-disable no-underscore-dangle */
import React, { useState, useContext, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { Grid } from "@mui/material";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import useHttpClient from "../../shared/hooks/http-hook";
import useFetch from "../../shared/hooks/useFetchHook";
import RecipesContext from "../../shared/context/RecipesContext";
import DisplayWrapper from "../../shared/components/DisplayWrapper";
import DeleteConfirmationModal from "../../shared/components/DeleteConfirmationModal";

function ViewRecipe() {
  const {
    error, isLoading, sendRequest, clearError
  } = useHttpClient();
  const [findingRecipe, setFindingRecipe] = useState(true);
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
        setFindingRecipe(false);
      } catch (err) {

      }
    };
    if (!contextRecipes) {
      fetchRecipes();
    } else {
      const selectedRecipe = contextRecipes.find((e) => e._id === recipeId);
      setRecipe(selectedRecipe);
      setFindingRecipe(false);
    }
  }, [sendRequest]);

  if (recipe && !findingRecipe && !isLoading) {
    return (
      <DisplayWrapper>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h2>{recipe.name}</h2>
          </Grid>
          <Grid item xs={12}>
            <img src={recipe.image} alt={recipe.name} />
          </Grid>
          <Grid item xs={12}>
            <div>
              <button type="button">Edit</button>
              <DeleteConfirmationModal />
            </div>
          </Grid>
        </Grid>
      </DisplayWrapper>
    );
  }
  return <LoadingSpinner asOverlay loadingMessage="Loading Recipe..." />;
}
export default ViewRecipe;
