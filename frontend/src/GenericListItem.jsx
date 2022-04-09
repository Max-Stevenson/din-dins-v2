import React from "react";
import PropTypes from "prop-types";
import { IconButton } from "@mui/material";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

function GenericListItem({ className, itemValue, listTitle, handleDeleteFromList }) {
  return (
    <div className={`recipe-form__${className}-wrapper`}>
      <p className={`recipe-form__${className}`}>{itemValue}</p>
      <IconButton onClick={() => handleDeleteFromList(listTitle, itemValue)}>
        <HighlightOffOutlinedIcon />
      </IconButton>
    </div>
  );
}

GenericListItem.propTypes = {

};

export default GenericListItem;
