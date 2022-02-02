import React from "react";
import NavButton from "./NavButton";
import "./Navbar.scss";

function Navbar() {
  return (
    <div className="navbar-container">
      <NavButton location="recipes" buttonText="Recipes" icon="utensils" />
      <NavButton location="mealplanner" buttonText="Mealplanner" icon="calendar-alt" />
      <NavButton location="settings" buttonText="Settings" icon="cog" />
    </div>
  );
}
export default Navbar;
