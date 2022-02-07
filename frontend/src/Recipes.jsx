/* eslint-disable no-underscore-dangle */
import React from "react";
import { Grid } from "@mui/material";
import useFetch from "./useFetchHook";

function Recipes() {
  const { data, error, loading } = useFetch("http://localhost:3000/api/v1/recipes");
  if (!loading && error) {
    return (
      <h2>Error loading recipes</h2>
    );
  }

  if (!loading && data) {
    // eslint-disable-next-line array-callback-return
    const recipeItems = data.map((recipe) => (
      <Grid item>
        <div key={recipe._id}>
          <h3>{recipe.name}</h3>
        </div>
      </Grid>
    ));
    return (
      <Grid container>
        {recipeItems}
      </Grid>
    );
  }

  return (
    <h2>Loading</h2>
  );
}

export default Recipes;
