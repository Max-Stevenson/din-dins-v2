import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Grid,
  Container,
  Tab,
  Tabs
} from "@mui/material";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import TabPanel from "./shared/TabPanel";

function RecipeReview({ formState, previousStep }) {
  const [tabValue, setTabValue] = useState(0);
  const handleChange = (_event, value) => {
    setTabValue(value);
  };

  const submitRecipe = () => {

  };

  return (
    <Container>
      <Grid container className="recipe-form__input-wrapper">
        <Grid item xs={12}>
          <h3>{formState.name.value}</h3>
        </Grid>
        <Grid item xs={12}>
          <img src="/images/recipe.jpg" alt="recipe placeholder" />
        </Grid>
        <Grid item xs={6}>
          <h5>
            Servings:
            {" "}
            {formState.servings.value}
          </h5>
          <Grid item xs={6}>
            <h5>
              Cooking Time:
              {" "}
              {formState.cookingTime.value}
            </h5>
          </Grid>
          <Grid item xs={6}>
            <h5>
              {formState.isVegetarian ? "Recipe is vegetarian" : "Recipe is not vegetarian"}
            </h5>
          </Grid>
          <Grid item xs={12}>
            <Tabs value={tabValue} onChange={handleChange}>
              <Tab label="Ingredients" />
              <Tab label="Method" />
            </Tabs>
            <TabPanel value={tabValue} index={0}>
              <h2>Ingredients</h2>
              <ul>
                {formState.ingredients.map((i) => (
                  <li>
                    {i.quantity}
                    {" "}
                    {i.measure}
                    {" "}
                    {i.ingredient}
                  </li>
                ))}
              </ul>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <h2>Method</h2>
              <ol>
                {formState.method.map((method) => (
                  <li>
                    {method.method}
                  </li>
                ))}
              </ol>
            </TabPanel>
          </Grid>
        </Grid>
        <Grid item xs={12} className="recipe-form__nav-button__container">
          <Button
            variant="contained"
            startIcon={<ArrowBackIosOutlinedIcon />}
            onClick={previousStep}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            onClick={submitRecipe}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

RecipeReview.propTypes = {
  formState: PropTypes.shape({
    name: PropTypes.shape({
      value: PropTypes.string,
      isValid: PropTypes.bool,
      errorMsg: PropTypes.string
    }),
    servings: PropTypes.shape({
      value: PropTypes.number,
      isValid: PropTypes.bool,
      errorMsg: PropTypes.string
    }),
    cookingTime: PropTypes.shape({
      value: PropTypes.number,
      isValid: PropTypes.bool,
      errorMsg: PropTypes.string
    }),
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
  }).isRequired,
  previousStep: PropTypes.func.isRequired
};

export default RecipeReview;
