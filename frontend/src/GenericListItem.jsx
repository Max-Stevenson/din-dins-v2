/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import { IconButton } from "@mui/material";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

function GenericListItem({
  className, listItem, listTitle, handleDeleteFromList
}) {
  return (
    <div className={`recipe-form__${className}-wrapper`}>
      <p className={`recipe-form__${className}`}>{listItem}</p>
      <IconButton onClick={() => handleDeleteFromList(listTitle, listItem)}>
        <HighlightOffOutlinedIcon />
      </IconButton>
    </div>
  );
}

GenericListItem.propTypes = {

};

export default GenericListItem;
