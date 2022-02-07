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
    return (
      <Grid container>
        <Grid item xs={6}>
          Hooray something is here!
        </Grid>
        <Grid item xs={6}>
          Hooray something is too!
        </Grid>
      </Grid>
    );
  }

  return (
    <h2>Loading</h2>
  );
}

export default Recipes;
