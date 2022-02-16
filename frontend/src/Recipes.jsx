/* eslint-disable no-underscore-dangle */
import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import LoadingSpinner from "./shared/LoadingSpinner";
import useFetch from "./useFetchHook";
import "./Recipes.scss";
import DisplayWrapper from "./shared/DisplayWrapper";

const logo = require("./recipe.jpg");

function Recipes() {
  const { data, error, loading } = useFetch(
    "http://localhost:3000/api/v1/recipes"
  );

  // const selectRecipe = (recipeId) => data.find((r) => r._id === recipeId);

  if (loading && !error) {
    return <LoadingSpinner />;
  }

  if (!loading && data) {
    // eslint-disable-next-line array-callback-return
    const recipeItems = data.map((recipe) => (
      <Grid
        key={recipe._id}
        item
        xs={6}
        sm={6}
        md={3}
      >
        <Link to={`/recipes/view/${recipe._id}`} state={recipe}>
          <div className="recipe-item__wrapper">
            <img alt="" src={logo} />
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
