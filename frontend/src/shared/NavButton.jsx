import React from "react";
import PropTypes from "prop-types";
import "./NavButton.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NavButton({ icon, size }) {
  return (
    <div className="nav-button">
      <FontAwesomeIcon size={size} icon={icon} />
    </div>
  );
}

NavButton.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.string
};

NavButton.defaultProps = {
  size: "md"
};
export default NavButton;
