import React from "react";
import PropTypes from "prop-types";
import { Tab, Tabs } from "@mui/material";

const logo = require("./recipe.jpg");

function RecipeItem({ recipeItem }) {
  const onChange = () => {
  };

  return (
    <div className="recipe-item__wrapper">
      <div className="recipe-item__img-wrapper">
        <img alt="" src={logo} />
      </div>
      <h3>{recipeItem.name}</h3>
      <Tabs onChange={() => onChange()} defaultSelectedIndex={1}>
        <Tab label="Ingredients" value="1" />
        <Tab label="Method" value="2" />
      </Tabs>
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
