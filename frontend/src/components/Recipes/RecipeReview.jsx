import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Button, Grid, Container, Tab, Tabs
} from "@mui/material";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import axios from "axios";
import TabPanel from "../../shared/components/TabPanel";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import { useAuth } from "../../shared/context/AuthContext";
import API_BASE_URL from "../../config";
import { hashCode } from "../../shared/utils/hashCode";
import "./RecipeReview.scss";

function RecipeReview({ formState, previousStep, mode }) {
  const { recipeId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [recipeSubmitted, setRecipeSubmitted] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const auth = useAuth();

  const handleChange = (_event, value) => {
    setTabValue(value);
  };

  const submitRecipe = async () => {
    const httpMethod = mode === "edit" ? "PUT" : "POST";
    setIsLoading(true);
    setRecipeSubmitted(true);
    const recipe = {
      name: formState.name.value,
      image: null,
      servings: formState.servings.value,
      cookingTime: formState.cookingTime.value,
      isVegetarian: formState.isVegetarian,
      ingredients: formState.ingredients,
      method: formState.method,
      tags: formState.tags,
      metadata: {
        dateLastConsumed: Date.now(),
        createdBy: auth.userId
      }
    };
    const formData = new FormData();
    formData.append("image", formState.image.file);
    try {
      const headers = { Authorization: `Bearer ${auth.token}` };
      const imageResponse = await axios.post(`${API_BASE_URL}/recipes/upload`, formData, { headers });
      if (imageResponse.status !== 201) {
        setIsLoading(false);
        setError("Upload failed");
      }
      recipe.image = imageResponse.data.imageUrl;
      let recipeResponse;
      if (httpMethod === "POST") {
        recipeResponse = await axios.post(`${API_BASE_URL}/recipes`, recipe, { headers });
      } else {
        recipeResponse = await axios.put(`${API_BASE_URL}/recipes/${recipeId}`, recipe, { headers });
      }
      if (recipeResponse.status !== 201) {
        setIsLoading(false);
        setError("recipe creation failed");
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.message || "An error occurred while submitting the recipe.");
    }
    return true;
  };

  if (recipeSubmitted) {
    return (
      <Container className="recipe-review__submit-container">
        {isLoading
          && (
          <>
            <LoadingSpinner />
            <h2>Loading...</h2>
          </>
          )}
        {!isLoading && (
          <h2>Recipe Creation successful</h2>
        )}
        {!isLoading && error && (
          <h2>{error}</h2>
        )}
      </Container>
    );
  }

  if (!recipeSubmitted) {
    return (
      <Container>
        <Grid container className="recipe-form__input-wrapper">
          <Grid item xs={12}>
            <h3>{formState.name.value}</h3>
          </Grid>
          <Grid item xs={12}>
            <img
              src={formState.image.preview || "/images/recipe.jpg"}
              alt="recipe placeholder"
            />
          </Grid>
          <Grid item xs={6}>
            <h5>
              Servings:
              {" "}
              {formState.servings.value}
            </h5>
          </Grid>
          <Grid item xs={6}>
            <h5>
              Cooking Time:
              {" "}
              {formState.cookingTime.value}
            </h5>
          </Grid>
          <Grid item xs={6}>
            <h5>
              {formState.isVegetarian
                ? "Recipe is vegetarian"
                : "Recipe is not vegetarian"}
            </h5>
          </Grid>
          <Grid item xs={12}>
            <Tabs value={tabValue} onChange={handleChange}>
              <Tab label="Ingredients" />
              <Tab label="Method" />
              <Tab label="Tags" />
            </Tabs>
            <TabPanel value={tabValue} index={0}>
              <ul>
                {formState.ingredients.map((i) => (
                  <li key={hashCode(`${i.quantity}${i.measure}${i.ingredient}`)}>
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
              <ol>
                {formState.method.map((method) => (
                  <li key={hashCode(method.method)}>{method.method}</li>
                ))}
              </ol>
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <ul>
                {formState.tags.map((t) => (
                  <li key={hashCode(t.tag)}>
                    {t.tag}
                  </li>
                ))}
              </ul>
            </TabPanel>
          </Grid>
          <Grid item xs={12} className="recipe-form__nav-button__container">
            <Button
              variant="contained"
              startIcon={<ArrowBackIosOutlinedIcon />}
              onClick={previousStep}
            >
              Previous
            </Button>
            <Button variant="contained" onClick={submitRecipe}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

RecipeReview.propTypes = {
  formState: PropTypes.shape({
    name: PropTypes.shape({
      value: PropTypes.string,
      isValid: PropTypes.bool,
      errorMsg: PropTypes.string
    }),
    image: PropTypes.shape({
      preview: PropTypes.string,
      file: PropTypes.shape({})
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
  previousStep: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired
};

export default RecipeReview;
