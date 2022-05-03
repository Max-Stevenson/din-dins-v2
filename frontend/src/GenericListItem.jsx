import React from "react";
import PropTypes from "prop-types";
import { IconButton } from "@mui/material";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import "./GenericListItem.scss";

function GenericListItem({
  className, listItem, handleDeleteFromList
}) {
  return (
    <div className={`recipe-form__${className}-wrapper`}>
      <p className={`recipe-form__${className}`}>{Object.values(listItem).map((listItemValue) => (`${listItemValue} `))}</p>
      <IconButton onClick={() => handleDeleteFromList(className, listItem)}>
        <HighlightOffOutlinedIcon />
      </IconButton>
    </div>
  );
}

GenericListItem.propTypes = {
  className: PropTypes.string.isRequired,
  listItem: PropTypes.objectOf(PropTypes.any).isRequired,
  handleDeleteFromList: PropTypes.func.isRequired
};

export default GenericListItem;
