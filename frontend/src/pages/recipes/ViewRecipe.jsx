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
import API_BASE_URL from "../../config";

function ViewRecipe() {
  const {
    isLoading, sendRequest, error
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

  const deleteRecipe = async () => {
    try {
      const response = await sendRequest(
        `${API_BASE_URL}/recipes/${recipe._id}`,
        "DELETE",
        null,
        { Authorization: `Bearer ${auth.token}` }
      );

      if (response.status === 200) {
        navigate("/", { state: { updateRecipes: true } });
      }
    } catch (err) {
      // Show an error message
      // ...
    }
  };

  if (error) {
    return (
      <DisplayWrapper>
        <h2>error</h2>
      </DisplayWrapper>
    );
  }

  if (recipe && !findingRecipe && !isLoading && !error) {
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
              <button type="button" onClick={() => navigate(`/recipes/edit/${recipe._id}`, { state: { recipe } })}>
                Edit
              </button>
              <DeleteConfirmationModal onDelete={deleteRecipe} />
            </div>
          </Grid>
        </Grid>
      </DisplayWrapper>
    );
  }
  return <LoadingSpinner asOverlay loadingMessage="Loading Recipe..." />;
}
export default ViewRecipe;
