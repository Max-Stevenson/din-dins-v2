import React, { useState, useEffect, useRef } from "react";
import validator from "validator";
import PropTypes from "prop-types";
import {
  Button, Grid, TextField
} from "@mui/material";

function NewGenericListItem({ recipeList, recipeListItem, handleAddToList }) {
  const [inputState, setInputState] = useState({
    [recipeList]: { value: "", isValid: false, errorMsg: "" }
  });

  const inputRef = useRef();

  useEffect(() => {
    setInputState({
      [recipeList]: {
        value: "", isValid: false, errorMsg: ""
      }
    });
  }, [recipeList]);

  const handleInputChange = (inputName, event) => {
    const inputValue = event.target.value;
    if (validator.isEmpty(inputValue.trim())) {
      setInputState((previous) => ({
        ...previous,
        [inputName]: {
          value: inputValue.trim(),
          isValid: false,
          errorMsg: `${inputName} cannot be empty`
        }
      }));
    } else {
      setInputState((previous) => ({
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
      [recipeListItem]: inputState[recipeList].value
    });
    setInputState({
      [recipeList]: {
        value: "", isValid: false, errorMsg: ""
      }
    });
    inputRef.current.value = "";
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          required
          autoComplete="off"
          type="text"
          inputRef={inputRef}
          onChange={(event) => {
            handleInputChange(recipeList, event);
          }}
          variant="outlined"
          InputLabelProps={{
            shrink: true
          }}
          label={recipeList}
        />
        {inputState[recipeList].errorMsg && <p>{inputState[recipeList].errorMsg}</p>}
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          disabled={
         !inputState[recipeList].isValid
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
