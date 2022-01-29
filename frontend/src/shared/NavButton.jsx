import React from "react";
import PropTypes from "prop-types";
import "./NavButton.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NavButton({ icon }) {
  return (
    <div className="navbar-container__nav-button">
      <FontAwesomeIcon icon={icon} />
    </div>
  );
}

NavButton.propTypes = {
  icon: PropTypes.string.isRequired
};
export default NavButton;
