import React from "react";
import PropTypes from "prop-types";

import "./LoadingSpinner.scss";

function LoadingSpinner({ asOverlay }) {
  return (
    <div className={`${asOverlay && "loading-spinner__overlay"}`}>
      <div className="lds-dual-ring" />
    </div>
  );
}

LoadingSpinner.propTypes = {
  asOverlay: PropTypes.bool
};

LoadingSpinner.defaultProps = {
  asOverlay: false
};

export default LoadingSpinner;
