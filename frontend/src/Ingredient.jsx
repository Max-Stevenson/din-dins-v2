import React from "react";
import PropTypes from "prop-types";
import { IconButton } from "@mui/material";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

function Ingredient({
  quantity, measure, ingredient, handleDelete
}) {
  return (
    <div>
      <p>{`${quantity} ${measure} ${ingredient}`}</p>
      <IconButton onClick={() => handleDelete({ quantity, measure, ingredient })}>
        <HighlightOffOutlinedIcon />
      </IconButton>
    </div>
  );
}

Ingredient.propTypes = {
  quantity: PropTypes.number.isRequired,
  measure: PropTypes.string.isRequired,
  ingredient: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default Ingredient;
