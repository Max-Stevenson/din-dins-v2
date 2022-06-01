/* eslint-disable no-unused-vars */
import React from "react";
import { useLocation, useParams } from "react-router";
// import LoadingSpinner from "../../shared/components/LoadingSpinner";
import useFetch from "../../shared/hooks/useFetchHook";

function ViewRecipe() {
  const { recipe } = useLocation().state;
  if (!recipe) {
    const { recipeId } = useParams();
    const { data, error, loading } = useFetch(
      `http://localhost:3000/api/v1/recipes/${recipeId}`
    );
  }

  // if (loading && !error) {
  //   return <LoadingSpinner />;
  // }

  // if (!loading && data) {
  //   return <h2>Data Loaded</h2>;
  // }
  return <h2>{recipe.name}</h2>;
}
export default ViewRecipe;
