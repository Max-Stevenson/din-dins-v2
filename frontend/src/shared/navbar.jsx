import React from "react";
import NavButton from "./NavButton";
import "./Navbar.scss";

function Navbar() {
  return (
    <div className="navbar-container flex-container">
      <NavButton icon="cog" />
      <NavButton />
      <NavButton />
    </div>
  );
}
export default Navbar;
