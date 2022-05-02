import React, { useState, useEffect } from "react";
import validator from "validator";
import PropTypes from "prop-types";
import {
  Button, Grid, TextField
} from "@mui/material";

function NewGenericListItem({ componentType, handleAddToList }) {
  const [internalState, setInternalState] = useState({
    [componentType]: { value: "", isValid: false, errorMsg: "" }
  });

  useEffect(() => {
    setInternalState({
      [componentType]: {
        value: "", isValid: false, errorMsg: ""
      }
    });
  }, [componentType]);

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
    handleAddToList(`${componentType}`, {
      [componentType]: internalState[componentType].value
    });
    setInternalState({
      [componentType]: {
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
            handleInputChange(componentType, event);
          }}
          variant="outlined"
          InputLabelProps={{
            shrink: true
          }}
          label={componentType}
        />
        {internalState[componentType].errorMsg && <p>{internalState[componentType].errorMsg}</p>}
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          disabled={
         !internalState[componentType].isValid
        }
          onClick={(event) => handleAdd(event)}
        >
          Add
          {" "}
          {componentType}
        </Button>
      </Grid>
    </Grid>
  );
}

NewGenericListItem.propTypes = {
  componentType: PropTypes.string.isRequired,
  handleAddToList: PropTypes.func.isRequired
};

export default NewGenericListItem;