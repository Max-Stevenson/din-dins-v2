/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { useAuth } from "../../shared/context/AuthContext";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import useHttpClient from "../../shared/hooks/http-hook";
import DisplayWrapper from "../../shared/components/DisplayWrapper";

import RecipesContext from "../../shared/context/RecipesContext";
import DateRangePicker from "../../components/Mealplanner/DateRangePicker";

function Mealplanner() {
  const auth = useAuth();
  const { contextRecipes, setContextRecipes } = useContext(RecipesContext);
  const [mealplan, setMealplan] = useState(null);
  const {
    error, isLoading, sendRequest, clearError
  } = useHttpClient();
  const [recipes, setRecipes] = useState();

  const generateMealplan = () => {
    const randomRecipes = recipes.sort(() => 0.5 - Math.random()).slice(0, 2);
    setMealplan(randomRecipes);
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await sendRequest(
          "http://localhost:3000/api/v1/recipes",
          "GET",
          null,
          { Authorization: `Bearer ${auth.user}` }
        );
        setRecipes(response.data);
        setContextRecipes(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (!contextRecipes) {
      fetchRecipes();
    } else {
      setRecipes(contextRecipes);
    }
  }, [sendRequest]);

  return (
    <DisplayWrapper>
      <DateRangePicker />
      <Grid container spacing={1}>
        <h2>Mealplanner</h2>
        <button type="button" onClick={generateMealplan}>
          Generate Mealplan
        </button>
        {mealplan !== null && (
          <div>
            {mealplan.map(({ name, _id }) => (
              <div key={_id}>
                <h3>{name}</h3>
              </div>
            ))}
          </div>
        )}
      </Grid>
    </DisplayWrapper>
  );
}
export default Mealplanner;
