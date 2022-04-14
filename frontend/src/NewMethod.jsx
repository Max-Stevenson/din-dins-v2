import React, { useState } from "react";
import validator from "validator";
import PropTypes from "prop-types";

function NewMethod(handleAddToList) {
  const [method, setMethod] = useState({
    method: "", isValid: false, errMsg: ""
  });

  const handleInputChange = (inputValue) => {
    if (validator.isEmpty(inputValue.trim())) {
      setMethod((previous) => ({
        ...previous,
        [method]: {
          value: inputValue.trim(),
          isValid: false,
          errorMsg: `${inputName} cannot be empty`
        }
      }));
    } else {
      setMethod((previous) => ({
        ...previous,
        [inputName]: {
          value: inputValue.trim(),
          isValid: true,
          errorMsg: ""
        }
      }));
    }
  };
  return (
    <div />
  );
}

NewMethod.propTypes = {
  handleAddToList: PropTypes.func
};

NewMethod.defaultProps = {
  handleAddToList: () => {}
};

export default NewMethod;
