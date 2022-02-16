import React from "react";
import { useLocation } from "react-router-dom";
// import PropTypes from "prop-types";

function ViewRecipe() {
  const location = useLocation();
  console.log(location);
  // const { fuck } = location.state;
  // console.log(fuck);

  return (
    <h2>View Recipe Page</h2>
  );
}

// ViewRecipe.propTypes = {
//   fuck: PropTypes.string.isRequired
// };

export default ViewRecipe;
