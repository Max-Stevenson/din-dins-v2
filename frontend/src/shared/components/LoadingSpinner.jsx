import React from "react";
import PropTypes from "prop-types";

import "./LoadingSpinner.scss";

function LoadingSpinner({ asOverlay, loadingMessage }) {
  return (
    <div className={`${asOverlay && "loading-spinner__overlay"}`}>
      <div className="lds-dual-ring" />
      <div>
        <h3>{loadingMessage}</h3>
      </div>
    </div>
  );
}

LoadingSpinner.propTypes = {
  asOverlay: PropTypes.bool,
  loadingMessage: PropTypes.string
};

LoadingSpinner.defaultProps = {
  asOverlay: false,
  loadingMessage: ""
};

export default LoadingSpinner;
