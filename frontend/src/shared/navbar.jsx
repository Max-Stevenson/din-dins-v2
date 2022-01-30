import React from "react";
import NavButton from "./NavButton";
import "./Navbar.scss";

function Navbar() {
  return (
    <div className="navbar-container">
      <NavButton icon="utensils" />
      <NavButton icon="calendar-alt" />
      <NavButton icon="cog" />
    </div>
  );
}
export default Navbar;
