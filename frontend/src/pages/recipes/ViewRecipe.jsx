/* eslint-disable no-empty */
/* eslint-disable no-underscore-dangle */
import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { Grid, Tab, Tabs } from "@mui/material";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import useHttpClient from "../../shared/hooks/http-hook";
import RecipesContext from "../../shared/context/RecipesContext";
import DisplayWrapper from "../../shared/components/DisplayWrapper";
import DeleteConfirmationModal from "../../shared/components/DeleteConfirmationModal";
import TabPanel from "../../shared/components/TabPanel";
import { useAuth } from "../../shared/context/AuthContext";
import { hashCode } from "../../shared/utils/hashCode";
import API_BASE_URL from "../../config";

function ViewRecipe() {
  const {
    isLoading, sendRequest, error
  } = useHttpClient();
  const auth = useAuth();
  const navigate = useNavigate();
  const [findingRecipe, setFindingRecipe] = useState(true);
  const [recipe, setRecipe] = useState();
  const { recipeId } = useParams();
  const [tabValue, setTabValue] = useState(0);
  const { contextRecipes, setContextRecipes } = useContext(RecipesContext);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await sendRequest(
          "http://localhost:3000/api/v1/recipes",
          "GET",
          null,
          { Authorization: `Bearer ${auth.token}` }
        );
        setRecipe(response.data.find((e) => e._id === recipeId));
        setContextRecipes(response.data);
        setFindingRecipe(false);
      } catch (err) {
        if (err.response.status === 401) {
          navigate("/profile");
        }
      }
    };
    if (!contextRecipes) {
      fetchRecipes();
    } else {
      const selectedRecipe = contextRecipes.find((e) => e._id === recipeId);
      setRecipe(selectedRecipe);
      setFindingRecipe(false);
    }
  }, [auth.token, navigate, recipeId, setRecipe, setContextRecipes, setFindingRecipe]);

  const handleChange = (_event, value) => {
    setTabValue(value);
  };

  const deleteRecipe = async () => {
    try {
      const response = await sendRequest(
        `${API_BASE_URL}/recipes/${recipe._id}`,
        "DELETE",
        null,
        { Authorization: `Bearer ${auth.token}` }
      );

      if (response.status === 200) {
        navigate("/", { state: { updateRecipes: true } });
      }
    } catch (err) {
      // Show an error message
      // ...
    }
  };

  if (error) {
    return (
      <DisplayWrapper>
        <h2>error</h2>
      </DisplayWrapper>
    );
  }

  if (recipe && !findingRecipe && !isLoading && !error) {
    return (
      <DisplayWrapper>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h2>{recipe.name}</h2>
          </Grid>
          <Grid item xs={12}>
            <img src={recipe.image} alt={recipe.name} />
          </Grid>
          <Grid item xs={12}>
            <Tabs value={tabValue} onChange={handleChange}>
              <Tab label="Ingredients" />
              <Tab label="Method" />
              <Tab label="Tags" />
            </Tabs>
            <TabPanel value={tabValue} index={0}>
              <ul>
                {recipe.ingredients.map((i) => (
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
                {recipe.method.map((method) => (
                  <li key={hashCode(method.method)}>{method.method}</li>
                ))}
              </ol>
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <ul>
                {recipe.tags.map((t) => (
                  <li key={hashCode(t.tag)}>
                    {t.tag}
                  </li>
                ))}
              </ul>
            </TabPanel>
          </Grid>
          <Grid item xs={12}>
            <div>
              <button type="button" onClick={() => navigate(`/recipes/edit/${recipe._id}`, { state: { recipe } })}>
                Edit
              </button>
              <DeleteConfirmationModal onDelete={deleteRecipe} />
            </div>
          </Grid>
        </Grid>
      </DisplayWrapper>
    );
  }
  return <LoadingSpinner asOverlay loadingMessage="Loading Recipe..." />;
}
export default ViewRecipe;
