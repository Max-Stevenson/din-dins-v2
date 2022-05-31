import React from "react";
// import { useParams } from "react-router";
// import LoadingSpinner from "../../shared/components/LoadingSpinner";
// import useFetch from "../../shared/hooks/useFetchHook";
import PropTypes from "prop-types";

function ViewRecipe({ recipe }) {
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
ViewRecipe.propTypes = {
  recipe: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    servings: PropTypes.number,
    cookingTime: PropTypes.number,
    isVegetarian: PropTypes.bool,
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        quantity: PropTypes.number,
        measure: PropTypes.string,
        ingredient: PropTypes.string
      })
    ),
    method: PropTypes.arrayOf(PropTypes.shape({ method: PropTypes.string })),
    tags: PropTypes.arrayOf(PropTypes.shape({ tag: PropTypes.string }))
  }).isRequired
};
export default ViewRecipe;
