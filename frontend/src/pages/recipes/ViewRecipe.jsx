/* eslint-disable no-unused-vars */
import React from "react";
import { useLocation } from "react-router";
// import { useParams } from "react-router";
// import LoadingSpinner from "../../shared/components/LoadingSpinner";
// import useFetch from "../../shared/hooks/useFetchHook";

function ViewRecipe() {
  const { state } = useLocation();
  const { recipe } = state;
  // const { recipe } = state;
  // const { recipeId } = useParams();
  // const { data, error, loading } = useFetch(
  //   `http://localhost:3000/api/v1/recipes/${recipeId}`
  // );

  // if (loading && !error) {
  //   return <LoadingSpinner />;
  // }

  // if (!loading && data) {
  //   return <h2>Data Loaded</h2>;
  // }
  return <h2>{recipe.name}</h2>;
}
export default ViewRecipe;
