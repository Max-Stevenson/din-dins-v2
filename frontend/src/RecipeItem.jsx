import React, { useState } from "react";
import PropTypes from "prop-types";
import { Tab, Tabs } from "@mui/material";

const logo = require("./recipe.jpg");

function RecipeItem({ recipeItem }) {
  const [tabValue, setTabValue] = useState(0);
  const handleChange = (_event, value) => {
    setTabValue(value);
  };

  return (
    <div className="recipe-item__wrapper">
      <div className="recipe-item__img-wrapper">
        <img alt="" src={logo} />
      </div>
      <h3>{recipeItem.name}</h3>
      <Tabs value={tabValue} onChange={handleChange}>
        <Tab label="Ingredients" />
        <Tab label="Method" />
      </Tabs>
      {tabValue === 0 && <h2>Ingredients</h2>}
      {tabValue === 1 && <h2>Method</h2>}

    </div>
  );
}

RecipeItem.propTypes = {
  recipeItem: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
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
    method: PropTypes.arrayOf(PropTypes.string),
    tags: PropTypes.arrayOf(PropTypes.string),
    __v: PropTypes.number
  }).isRequired
};

export default RecipeItem;