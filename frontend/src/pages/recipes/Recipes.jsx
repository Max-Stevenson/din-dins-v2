/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import "./Recipes.scss";
import DisplayWrapper from "../../shared/components/DisplayWrapper";
import useHttpClient from "../../shared/hooks/http-hook";
import { useAuth } from "../../shared/context/AuthContext";
import API_BASE_URL from "../../config";

function Recipes() {
  const navigate = useNavigate();
  const auth = useAuth();
  const {
    error, isLoading, sendRequest
  } = useHttpClient();
  const [recipes, setRecipes] = useState();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await sendRequest(
          `${API_BASE_URL}/recipes`,
          "GET",
          null,
          { Authorization: `Bearer ${auth.token}` }
        );
        setRecipes(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecipes();
  }, [sendRequest, auth.token]);

  const handleRecipeSelection = (event) => {
    const selectedRecipeId = event.currentTarget.getAttribute("data-recipe-id");
    if (selectedRecipeId) {
      const selectedRecipe = recipes.find((element) => element._id === selectedRecipeId);
      navigate(`/recipes/view/${selectedRecipeId}`, {
        state: { recipe: selectedRecipe }
      });
    }
  };

  if (isLoading && !error) {
    return <LoadingSpinner asOverlay loadingMessage="Loading Recipes..." />;
  }

  if (!isLoading && recipes) {
    const recipeItems = recipes.map((recipe) => (
      <Grid key={recipe._id} item xs={6} sm={6} md={3}>
        <div
          data-recipe-id={recipe._id}
          onClick={(event) => handleRecipeSelection(event)}
          tabIndex={0}
          role="button"
          className="recipe-item__wrapper"
        >
          <img alt="" src={recipe.image} />
          <h3 className="recipe-item__recipe-name">{recipe.name}</h3>
        </div>
      </Grid>
    ));
    return (
      <DisplayWrapper>
        <Grid container spacing={1}>
          {recipeItems}
          <Grid key="newRecipe" item xs={6} sm={6} md={3}>
            <Link className="recipe-item__new-recipe" to="/recipes/new">
              <div className="recipe-item__wrapper">
                <img alt="" src="/images/recipe.jpg" />
                <h3 className="recipe-item__recipe-name">Add New Recipe</h3>
              </div>
            </Link>
          </Grid>
        </Grid>
      </DisplayWrapper>
    );
  }
  return <h2>Loading</h2>;
}

export default Recipes;
