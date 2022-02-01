import React from "react";
import PropTypes from "prop-types";
import "./NavButton.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NavButton({ icon, size, buttonText }) {
  return (
    <div className="nav-button">
      <FontAwesomeIcon size={size} icon={icon} />
      <p className="nav-button__text">{buttonText}</p>
    </div>
  );
}

NavButton.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.string,
  buttonText: PropTypes.string.isRequired
};

NavButton.defaultProps = {
  size: "md"
};
export default NavButton;
