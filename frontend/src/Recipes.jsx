/* eslint-disable no-underscore-dangle */
import React from "react";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import useFetch from "./useFetchHook";
import "./Recipes.scss";

const logo = require("./recipe.jpg");

function Recipes() {
  const { data, error, loading } = useFetch(
    "http://localhost:3000/api/v1/recipes"
  );
  if (!loading && error) {
    return <h2>Error loading recipes</h2>;
  }

  if (!loading && data) {
    // eslint-disable-next-line array-callback-return
    const recipeItems = data.map((recipe) => (
      <Grid key={recipe._id} item xs={6} sm={6} md={3}>
        <Link to={`/recipes/view/${recipe._id}`}>
          <div>
            <img alt="" src={logo} />
            <h3>{recipe.name}</h3>
          </div>
        </Link>
      </Grid>
    ));
    return (
      <div className="wrapper">
        <Grid container>{recipeItems}</Grid>
      </div>
    );
  }

  return <h2>Loading</h2>;
}

export default Recipes;
