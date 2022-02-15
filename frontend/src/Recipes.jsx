/* eslint-disable no-underscore-dangle */
import React, { useState } from "react";
import { Grid } from "@mui/material";
import LoadingSpinner from "./shared/LoadingSpinner";
import useFetch from "./useFetchHook";
import "./Recipes.scss";
import RecipeItem from "./RecipeItem";

const logo = require("./recipe.jpg");

function Recipes() {
  const { data, error, loading } = useFetch(
    "http://localhost:3000/api/v1/recipes"
  );

  const [isRecipeView, setIsRecipeView] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState();

  const selectRecipe = (recipeId) => {
    const recipe = data.find((r) => r._id === recipeId);
    if (recipe) {
      setSelectedRecipe(recipe);
      setIsRecipeView(true);
    }
  };

  if (isRecipeView && selectedRecipe) {
    return <RecipeItem recipeItem={selectedRecipe} />;
  }

  if (loading && !error) {
    return <LoadingSpinner />;
  }

  if (!loading && data) {
    // eslint-disable-next-line array-callback-return
    const recipeItems = data.map((recipe) => (
      <Grid onClick={() => selectRecipe(recipe._id)} key={recipe._id} item xs={6} sm={6} md={3}>
        <div className="recipe-item__wrapper">
          <img alt="" src={logo} />
          <h3>{recipe.name}</h3>
        </div>
      </Grid>
    ));
    return (
      <div className="wrapper">
        <Grid container spacing={1}>
          {recipeItems}
        </Grid>
      </div>
    );
  }

  return <h2>Loading</h2>;
}

export default Recipes;
