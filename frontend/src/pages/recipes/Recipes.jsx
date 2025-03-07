/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import "./Recipes.scss";
import DisplayWrapper from "../../shared/components/DisplayWrapper";
import useHttpClient from "../../shared/hooks/http-hook";
import { useAuth } from "../../shared/context/AuthContext";
import API_BASE_URL from "../../config";
import GenericFilter from "../../components/Recipes/GenericFilter";

function Recipes() {
  const navigate = useNavigate();
  const auth = useAuth();
  const {
    error, isLoading, sendRequest
  } = useHttpClient();
  const [recipes, setRecipes] = useState([]);
  const [filters, setFilters] = useState({
    tags: [],
    ingredients: []
  });

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await sendRequest(
          `${API_BASE_URL}/recipes`,
          "GET",
          null,
          { Authorization: `Bearer ${auth.token}` }
        );
        setRecipes(response.data);
      } catch (err) {
        console.error(err);
        console.log(filters);
      }
    };
    fetchRecipes();
  }, [sendRequest, auth.token]);

  const filteredRecipes = useMemo(() => {
    if (!recipes) return [];
    let filtered = recipes;
    if (filters.tags.length > 0) {
      filtered = filtered.filter((recipe) => {
        const recipeTags = recipe.tags.map((tagObj) => tagObj.tag);
        return filters.tags.every((tag) => recipeTags.includes(tag));
      });
    }
    if (filters.ingredients.length > 0) {
      filtered = filtered.filter((recipe) => {
        const recipeIngredients = recipe.ingredients.map(
          (ing) => ing.ingredient
        );
        return filters.ingredients.every((ingredient) => recipeIngredients.includes(ingredient));
      });
    }
    return filtered;
  }, [recipes, filters]);

  // // Whenever the recipes or filters change, update the filtered recipes
  // useEffect(() => {
  //   if (!recipes.length) return;
  //   let filtered = recipes;
  //   // Filter by tags if any are selected
  //   if (filters.tags.length > 0) {
  //     filtered = filtered.filter((recipe) => {
  //       const recipeTags = recipe.tags.map((tagObj) => tagObj.tag);
  //       return filters.tags.every((tag) => recipeTags.includes(tag));
  //     });
  //   }
  //   // Filter by ingredients if any are selected
  //   if (filters.ingredients.length > 0) {
  //     filtered = filtered.filter((recipe) => {
  //       const recipeIngredients = recipe.ingredients.map((ing) => ing.ingredient);
  //       return filters.ingredients.every((ingredient) => recipeIngredients.includes(ingredient));
  //     });
  //   }
  //   setFilteredRecipes(filtered);
  // }, [filters, recipes]);

  // A generic handler to update a specific filter type
  const handleFilterChange = (filterType, selectedOptions) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: selectedOptions
    }));
  };

  const handleRecipeSelection = (event) => {
    const selectedRecipeId = event.currentTarget.getAttribute("data-recipe-id");
    if (selectedRecipeId) {
      const selectedRecipe = recipes.find((element) => element._id === selectedRecipeId);
      navigate(`/recipes/view/${selectedRecipeId}`, {
        state: { recipe: selectedRecipe }
      });
    }
  };

  if (isLoading && !error) {
    return <LoadingSpinner asOverlay loadingMessage="Loading Recipes..." />;
  }

  if (!isLoading && recipes.length > 0) {
    const recipeItems = filteredRecipes.map((recipe) => (
      <Grid key={recipe._id} item xs={6} sm={6} md={3}>
        <div
          data-recipe-id={recipe._id}
          onClick={handleRecipeSelection}
          tabIndex={0}
          role="button"
          className="recipe-item__wrapper"
        >
          <img alt="" src={recipe.image} />
          <h3 className="recipe-item__recipe-name">{recipe.name}</h3>
        </div>
      </Grid>
    ));

    return (
      <DisplayWrapper>
        {/* Generic filter for Tags */}
        <GenericFilter
          data={recipes}
          optionAccessor={(recipe) => recipe.tags.map((tagObj) => tagObj.tag)}
          label="Tags"
          onFilterChange={(selected) => handleFilterChange("tags", selected)}
        />
        {/* Generic filter for Ingredients */}
        <GenericFilter
          data={recipes}
          optionAccessor={(recipe) => recipe.ingredients.map((ing) => ing.ingredient)}
          label="Ingredients"
          onFilterChange={(selected) => handleFilterChange("ingredients", selected)}
        />
        <Grid container spacing={1}>
          {recipeItems}
          <Grid key="newRecipe" item xs={6} sm={6} md={3}>
            <Link className="recipe-item__new-recipe" to="/recipes/new">
              <div className="recipe-item__wrapper">
                <img alt="" src="/images/recipe.jpg" />
                <h3 className="recipe-item__recipe-name">Add New Recipe</h3>
              </div>
            </Link>
          </Grid>
        </Grid>
      </DisplayWrapper>
    );
  }
  return <h2>Loading</h2>;
}

export default Recipes;
