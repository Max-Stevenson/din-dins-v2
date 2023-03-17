import React from "react";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, redirectPath = "/profile" }) {
  const auth = useAuth();
  const location = useLocation();
  const { pathname } = location;

  let jwtValid = false;

  if (auth.token) {
    try {
      const payload = JSON.parse(atob(auth.token.split(".")[1]));
      jwtValid = payload.exp * 1000 > Date.now();
    } catch (error) {
      jwtValid = false;
    }
  }

  return jwtValid
    ? children : <Navigate to={{ pathname: redirectPath, state: { from: pathname } }} />;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  redirectPath: PropTypes.string
};

ProtectedRoute.defaultProps = {
  redirectPath: "/profile"
};

export default ProtectedRoute;
