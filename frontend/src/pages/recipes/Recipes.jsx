/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import useFetch from "../../shared/hooks/useFetchHook";
import "./Recipes.scss";
import DisplayWrapper from "../../shared/components/DisplayWrapper";
import ViewRecipe from "./ViewRecipe";

function Recipes() {
  const navigate = useNavigate();
  // const [selectedRecipe, setSelectedRecipe] = useState(null);
  const { data, error, loading } = useFetch(
    "http://localhost:3000/api/v1/recipes"
  );

  const handleRecipeSelection = (event) => {
    const selectedRecipeId = event.currentTarget.getAttribute("data-recipe-id");
    if (selectedRecipeId) {
      const selectedRecipe = (data.filter((element) => element._id === selectedRecipeId)[0]);
      navigate(`/recipes/view/${selectedRecipeId}`, { state: { recipe: selectedRecipe } });
    }
  };

  if (loading && !error) {
    return <LoadingSpinner />;
  }

  if (!loading && data) {
    const recipeItems = data.map((recipe) => (
      <Grid
        key={recipe._id}
        item
        xs={6}
        sm={6}
        md={3}
      >

        <div data-recipe-id={recipe._id} onClick={(event) => handleRecipeSelection(event)} tabIndex={0} role="button" className="recipe-item__wrapper">
          <img alt="" src={recipe.image} />
          <h3>{recipe.name}</h3>
        </div>

      </Grid>
    ));
    return (
      <DisplayWrapper>
        <Grid container spacing={1}>
          {recipeItems}
        </Grid>
      </DisplayWrapper>
    );
  }

  return <h2>Loading</h2>;
}

export default Recipes;
