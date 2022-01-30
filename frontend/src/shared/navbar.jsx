import React from "react";
import NavButton from "./NavButton";
import "./Navbar.scss";

function Navbar() {
  return (
    <div className="navbar-container">
      <NavButton icon="cog" />
      <NavButton icon="utensils" />
      <NavButton icon="calendar-alt" />
    </div>
  );
}
export default Navbar;
