import React, { useState, useEffect } from "react";
import validator from "validator";
import PropTypes from "prop-types";
import {
  Button, Grid, TextField
} from "@mui/material";

function NewGenericListItem({ recipeList, recipeListItem, handleAddToList }) {
  const [internalState, setInternalState] = useState({
    [recipeList]: { value: "", isValid: false, errorMsg: "" }
  });

  useEffect(() => {
    setInternalState({
      [recipeList]: {
        value: "", isValid: false, errorMsg: ""
      }
    });
  }, [recipeList]);

  const handleInputChange = (inputName, event) => {
    const inputValue = event.target.value;
    if (validator.isEmpty(inputValue.trim())) {
      setInternalState((previous) => ({
        ...previous,
        [inputName]: {
          value: inputValue.trim(),
          isValid: false,
          errorMsg: `${inputName} cannot be empty`
        }
      }));
    } else {
      setInternalState((previous) => ({
        ...previous,
        [inputName]: {
          value: inputValue.trim(),
          isValid: true,
          errorMsg: ""
        }
      }));
    }
  };

  const handleAdd = (event) => {
    event.preventDefault();
    handleAddToList(`${recipeList}`, {
      [recipeListItem]: internalState[recipeList].value
    });
    setInternalState({
      [recipeList]: {
        value: "", isValid: false, errorMsg: ""
      }
    });
    const inputField = document.querySelector("input");
    inputField.value = "";
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          required
          autoComplete="off"
          type="text"
          onChange={(event) => {
            handleInputChange(recipeList, event);
          }}
          variant="outlined"
          InputLabelProps={{
            shrink: true
          }}
          label={recipeList}
        />
        {internalState[recipeList].errorMsg && <p>{internalState[recipeList].errorMsg}</p>}
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          disabled={
         !internalState[recipeList].isValid
        }
          onClick={(event) => handleAdd(event)}
        >
          Add
          {" "}
          {recipeList}
        </Button>
      </Grid>
    </Grid>
  );
}

NewGenericListItem.propTypes = {
  recipeList: PropTypes.string.isRequired,
  recipeListItem: PropTypes.string.isRequired,
  handleAddToList: PropTypes.func.isRequired
};

export default NewGenericListItem;
