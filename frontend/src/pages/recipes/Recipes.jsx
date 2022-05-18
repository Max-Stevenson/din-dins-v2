/* eslint-disable no-underscore-dangle */
import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import useFetch from "../../shared/hooks/useFetchHook";
import "./Recipes.scss";
import DisplayWrapper from "../../shared/components/DisplayWrapper";

function Recipes() {
  const { data, error, loading } = useFetch(
    "http://localhost:3000/api/v1/recipes"
  );

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
        <Link to={`/recipes/view/${recipe._id}`}>
          <div className="recipe-item__wrapper">
            <img alt="" src="/images/recipe.jpg" />
            <h3>{recipe.name}</h3>
          </div>
        </Link>

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
