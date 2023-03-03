/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./Header.scss";
import { useAuth } from "../context/AuthContext";

function Header() {
  const auth = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    setIsAuthenticated(!!auth.userId);
  }, [auth.userId]);

  return (
    <div className="header-container">
      <h2>Din Dins</h2>
      {isAuthenticated && <button type="button" onClick={auth.logout}>Logout</button>}
    </div>
  );
}

export default Header;
