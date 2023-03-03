/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./Header.scss";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../context/AuthContext";
import NavButton from "./NavButton";

function Header() {
  const auth = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    setIsAuthenticated(!!auth.userId);
  }, [auth.userId]);

  return (
    <div className="header-container">
      <h2>Din Dins</h2>
      <nav className="desktop-navbar">
        <NavButton location="" buttonText="Recipes" icon="utensils" />
        <NavButton
          location="mealplanner"
          buttonText="Mealplanner"
          icon="calendar-alt"
        />
        <NavButton location="settings" buttonText="Settings" icon="cog" />
      </nav>
      {isAuthenticated && (
      <Button variant="contained" onClick={auth.logout} endIcon={<LogoutIcon />}>
        Logout
      </Button>
      )}
    </div>
  );
}

export default Header;
