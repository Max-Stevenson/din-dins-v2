import React from "react";
import NavButton from "./NavButton";
import "./Navbar.scss";

function Navbar() {
  return (
    <div className="navbar-container">
      <NavButton buttonText="Recipes" icon="utensils" />
      <NavButton buttonText="Mealplanner" icon="calendar-alt" />
      <NavButton buttonText="Settings" icon="cog" />
    </div>
  );
}
export default Navbar;
