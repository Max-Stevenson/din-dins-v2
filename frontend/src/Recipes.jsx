import React, { useEffect, useState } from "react";
import useFetch from "./useFetchHook";

function Recipes() {
  const [recipes, setRecipes] = useState();

  useEffect(() => {
    useFetch("http://localhost:3000/api/v1/recipes");
  }, []);
  return (
    <h2>Recipes Page</h2>
  );
}
export default Recipes;
