import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import "./NavButton.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NavButton({
  icon, size, buttonText, location
}) {
  return (
    <NavLink className={({ isActive }) => (isActive ? "nav-button nav-button__active" : "nav-button nav-button__inactive")} to={`/${location}`}>
      <FontAwesomeIcon size={size} icon={icon} />
      <p className="nav-button__text">{buttonText}</p>
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
  size: "lg"
};
export default NavButton;
