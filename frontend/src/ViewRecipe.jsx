import React from "react";
import { useLocation } from "react-router-dom";

function ViewRecipe() {
  const location = useLocation();
  console.log(location.state);

  return (
    <h2>View Recipe Page</h2>
  );
}

export default ViewRecipe;
