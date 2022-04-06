import React from "react";
import PropTypes from "prop-types";
import { IconButton } from "@mui/material";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

function Ingredient({
  listItem, handleDeleteFromList
}) {
  return (
    <div className="recipe-form__ingreident-wrapper">
      <p className="recipe-form__ingredient">{`${listItem.quantity} ${listItem.measure} ${listItem.ingredient}`}</p>
      <IconButton onClick={() => handleDeleteFromList("ingredients", listItem)}>
        <HighlightOffOutlinedIcon />
      </IconButton>
    </div>
  );
}

Ingredient.propTypes = {
  listItem: PropTypes.shape({
    quantity: PropTypes.number,
    measure: PropTypes.string,
    ingredient: PropTypes.string
  }),
  handleDeleteFromList: PropTypes.func
};

Ingredient.defaultProps = {
  listItem: {},
  handleDeleteFromList: () => {}
};

export default Ingredient;
