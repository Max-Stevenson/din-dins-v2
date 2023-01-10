/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { useAuth } from "../../shared/context/AuthContext";
import RecipesContext from "../../shared/context/RecipesContext";

function Mealplanner() {
  const auth = useAuth();
  const { contextRecipes } = useContext(RecipesContext);

  return (
    <h2>Mealplanner Page</h2>
  );
}
export default Mealplanner;
