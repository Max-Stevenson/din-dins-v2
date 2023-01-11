/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { Grid } from "@mui/material";
import { useAuth } from "../../shared/context/AuthContext";
import DisplayWrapper from "../../shared/components/DisplayWrapper";

import RecipesContext from "../../shared/context/RecipesContext";

function Mealplanner() {
  const auth = useAuth();
  const { contextRecipes } = useContext(RecipesContext);
  const [mealplan, setMealplan] = useState(null);

  const generateMealplan = () => {
    const randomRecipes = contextRecipes.sort(() => 0.5 - Math.random()).slice(0, 2);
    setMealplan(randomRecipes);
  };

  return (
    <DisplayWrapper>
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
