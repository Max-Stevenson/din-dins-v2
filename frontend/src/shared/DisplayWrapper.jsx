import React from "react";
import PropTypes from "prop-types";
import "./DisplayWrapper.scss";

function DisplayWrapper({ children }) {
  return <div className="display-wrapper">{children}</div>;
}

DisplayWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default DisplayWrapper;
