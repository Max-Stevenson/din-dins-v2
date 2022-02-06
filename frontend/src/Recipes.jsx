import React from "react";
import useFetch from "./useFetchHook";

function Recipes() {
  const { data, error, loading } = useFetch("http://localhost:3000/api/v1/recipes");
  console.log(data);

  return (
    <>
      {loading && <h1>Im loading</h1>}
      <h2>Recipes Page</h2>
      <div>{!error && data && data[1].name}</div>
    </>
  );
}

export default Recipes;
