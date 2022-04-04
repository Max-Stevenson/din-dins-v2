import React from "react";
import PropTypes from "prop-types";
import { Button, Grid, Container } from "@mui/material";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { hashCode } from "./hashCode";

function GenericList({
  listName,
  formState,
  listChildren,
  listItemChild,
  nextStep,
  previousStep,
  handleAddToList,
  handleDeleteFromList
}) {
  return (
    <Container>
      <Grid container rowSpacing={2} className="recipe-form__input-wrapper">
        <Grid item>
          <ul>
            {`${formState}.${listName}`.length > 0 && `${formState}.${listName}`.map((listItem) => (
              <li key={hashCode(listItem)}>
                {React.cloneElement(listChildren, { itemDetails: listItem, handleDeleteFromList })}
              </li>
            ))}
          </ul>
        </Grid>
        <Grid item xs={12}>
          {React.cloneElement(listItemChild, { handleAddToList })}
        </Grid>
        <Grid item xs={12} className="recipe-form__nav-button__container">
          <Button
            variant="contained"
            startIcon={<ArrowBackIosOutlinedIcon />}
            onClick={previousStep}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            endIcon={<ArrowForwardIosOutlinedIcon />}
            disabled={!`${formState}.${listName}`.length > 0}
            onClick={nextStep}
          >
            Continue

          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

GenericList.propTypes = {
  listChildren: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  listItemChild: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  listName: PropTypes.string.isRequired,
  nextStep: PropTypes.func.isRequired,
  previousStep: PropTypes.func.isRequired,
  formState: PropTypes.shape({
    name: PropTypes.shape({
      value: PropTypes.string,
      isValid: PropTypes.bool,
      errorMsg: PropTypes.string
    }),
    servings: PropTypes.shape({
      value: PropTypes.number,
      isValid: PropTypes.bool,
      errorMsg: PropTypes.string
    }),
    cookingTime: PropTypes.shape({
      value: PropTypes.number,
      isValid: PropTypes.bool,
      errorMsg: PropTypes.string
    }),
    isVegetarian: PropTypes.bool,
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        quantity: PropTypes.number,
        measure: PropTypes.string,
        ingredient: PropTypes.string
      })
    ),
    method: PropTypes.arrayOf(PropTypes.string),
    tags: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  handleAddToList: PropTypes.func.isRequired,
  handleDeleteFromList: PropTypes.func.isRequired
};

export default GenericList;