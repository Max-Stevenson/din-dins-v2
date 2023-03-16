/* eslint-disable no-empty */
/* eslint-disable no-underscore-dangle */
import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import useHttpClient from "../../shared/hooks/http-hook";
import RecipesContext from "../../shared/context/RecipesContext";
import DisplayWrapper from "../../shared/components/DisplayWrapper";
import DeleteConfirmationModal from "../../shared/components/DeleteConfirmationModal";
import { useAuth } from "../../shared/context/AuthContext";

function ViewRecipe() {
  const {
    isLoading, sendRequest
  } = useHttpClient();
  const auth = useAuth();
  const navigate = useNavigate();
  const [findingRecipe, setFindingRecipe] = useState(true);
  const [recipe, setRecipe] = useState();
  const { recipeId } = useParams();
  const { contextRecipes, setContextRecipes } = useContext(RecipesContext);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await sendRequest(
          "http://localhost:3000/api/v1/recipes",
          "GET",
          null,
          { Authorization: `Bearer ${auth.token}` }
        );
        setRecipe(response.data.find((e) => e._id === recipeId));
        setContextRecipes(response.data);
        setFindingRecipe(false);
      } catch (err) {
        if (err.response.status === 401) {
          navigate("/profile");
        }
      }
    };
    if (!contextRecipes) {
      fetchRecipes();
    } else {
      const selectedRecipe = contextRecipes.find((e) => e._id === recipeId);
      setRecipe(selectedRecipe);
      setFindingRecipe(false);
    }
  }, [auth.token, navigate, recipeId, setRecipe, setContextRecipes, setFindingRecipe]);

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
              <DeleteConfirmationModal onDelete={() => console.log("bruh")} />
            </div>
          </Grid>
        </Grid>
      </DisplayWrapper>
    );
  }
  return <LoadingSpinner asOverlay loadingMessage="Loading Recipe..." />;
}
export default ViewRecipe;
