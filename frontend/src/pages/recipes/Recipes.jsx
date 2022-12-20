/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import "./Recipes.scss";
import DisplayWrapper from "../../shared/components/DisplayWrapper";
import useHttpClient from "../../shared/hooks/http-hook";
import RecipesContext from "../../shared/context/RecipesContext";
import AuthContext from "../../shared/context/AuthContext";

function Recipes() {
  const navigate = useNavigate();
  const {
    error, isLoading, sendRequest, clearError
  } = useHttpClient();
  const [recipes, setRecipes] = useState();
  const { contextRecipes, setContextRecipes } = useContext(RecipesContext);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await sendRequest("http://localhost:3000/api/v1/recipes", "get", null, { Authorization: `Bearer ${"jwt"}` });
        setRecipes(response.data);
        setContextRecipes(response.data);
      } catch (err) {
      }
    };
    if (!contextRecipes) {
      fetchRecipes();
    } else {
      setRecipes(contextRecipes);
    }
  }, [sendRequest]);

  const handleRecipeSelection = (event) => {
    const selectedRecipeId = event.currentTarget.getAttribute("data-recipe-id");
    if (selectedRecipeId) {
      const selectedRecipe = recipes.filter(
        (element) => element._id === selectedRecipeId
      )[0];
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
    recipeItems.push();
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
