/* eslint-disable no-empty */
/* eslint-disable no-underscore-dangle */
import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import {
  Button, Grid, Tab, Tabs
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import useHttpClient from "../../shared/hooks/http-hook";
import RecipesContext from "../../shared/context/RecipesContext";
import DisplayWrapper from "../../shared/components/DisplayWrapper";
import DeleteConfirmationModal from "../../shared/components/DeleteConfirmationModal";
import TabPanel from "../../shared/components/TabPanel";
import { useAuth } from "../../shared/context/AuthContext";
import { hashCode } from "../../shared/utils/hashCode";
import API_BASE_URL from "../../config";
import "./viewRecipe.scss";

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
          <Grid className="view-recipe__name-container" item xs={12}>
            <h2 className="view-recipe__name">{recipe.name}</h2>
          </Grid>
          <Grid className="view-recipe__image-container" item xs={12}>
            <img className="view-recipe__image" src={recipe.image} alt={recipe.name} />
          </Grid>
          <Grid item xs={12}>
            <Tabs value={tabValue} onChange={handleChange}>
              <Tab label="Ingredients" />
              <Tab label="Method" />
              <Tab label="Tags" />
            </Tabs>
            <TabPanel value={tabValue} index={0}>
              <ul className="view-recipe__ingredient-list">
                {recipe.ingredients.map((i) => (
                  <li className="view-recipe__ingredient" key={hashCode(`${i.quantity}${i.measure}${i.ingredient}`)}>
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
              <ol className="view-recipe__method-list">
                {recipe.method.map((method) => (
                  <li className="view-recipe__method" key={hashCode(method.method)}>{method.method}</li>
                ))}
              </ol>
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <ul className="view-recipe__tag-list">
                {recipe.tags.map((t) => (
                  <li className="view-recipe__tag" key={hashCode(t.tag)}>
                    {t.tag}
                  </li>
                ))}
              </ul>
            </TabPanel>
          </Grid>
          <Grid item xs={12}>
            <div className="view-recipe__button-container">
              <Button startIcon={<EditIcon />} variant="contained" className="view-recipe__edit-button" type="button" onClick={() => navigate(`/recipes/edit/${recipe._id}`, { state: { recipe } })}>
                Edit
              </Button>
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
