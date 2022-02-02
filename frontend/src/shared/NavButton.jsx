import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import "./NavButton.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NavButton({
  icon, size, buttonText, location
}) {
  return (
    <NavLink to={`/${location}`}>
      <FontAwesomeIcon size={size} icon={icon} />
      <p>{buttonText}</p>
    </NavLink>
  );
}

NavButton.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.string,
  buttonText: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired
};

NavButton.defaultProps = {
  size: "md"
};
export default NavButton;
