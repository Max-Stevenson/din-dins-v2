import React from "react";
import PropTypes from "prop-types";
import { Button, Grid, Container } from "@mui/material";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { hashCode } from "../../shared/utils/hashCode";
import "./GenericList.scss";

function GenericList({
  isRequired,
  listName,
  formState,
  listChildren,
  listItemChild,
  nextStep,
  previousStep
}) {
  const getItemKey = (listItem) => {
    if (Object.hasOwn(listItem, "ingredient")) {
      return hashCode(Object.values(listItem)[2]);
    }
    return hashCode(Object.values(listItem)[0]);
  };

  return (
    <Container>
      <Grid container rowSpacing={2} className="recipe-form__input-wrapper">
        <Grid className={`recipe-form__${listName}-list-wrapper recipe-form__list-wrapper`} item xs={12}>
          <ul>
            {formState[`${listName}`].length > 0 && formState[`${listName}`].map((listItem) => (
              <li className={`recipe-form__${listName}-item`} key={getItemKey(listItem)}>
                {React.cloneElement(
                  listChildren,
                  { listItem }
                )}
              </li>
            ))}
          </ul>
        </Grid>
        <Grid item xs={12}>
          {React.cloneElement(listItemChild)}
        </Grid>
        <Grid item xs={12} className="recipe-form__nav-button__container">
          <Button
            aria-label="previous step"
            variant="contained"
            startIcon={<ArrowBackIosOutlinedIcon />}
            onClick={previousStep}
          >
            Previous
          </Button>
          <Button
            aria-label="next step"
            variant="contained"
            endIcon={<ArrowForwardIosOutlinedIcon />}
            disabled={isRequired && formState[listName].length === 0}
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
  isRequired: PropTypes.bool.isRequired,
  listChildren: PropTypes.element.isRequired,
  listItemChild: PropTypes.element.isRequired,
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
    method: PropTypes.arrayOf(PropTypes.shape({ method: PropTypes.string })),
    tags: PropTypes.arrayOf(PropTypes.shape({ tag: PropTypes.string }))
  }).isRequired
};

export default GenericList;
