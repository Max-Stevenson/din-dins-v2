import React from "react";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, redirectPath = "/user" }) {
  const auth = useAuth();
  const location = useLocation();
  const { pathname } = location;

  const checkJwt = () => {
    if (!auth.token) {
      return false;
    }
    try {
      const payload = JSON.parse(atob(auth.token.split(".")[1]));
      if (payload.exp * 1000 > Date.now()) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const jwtValid = checkJwt();
  return jwtValid
    ? children : <Navigate to={{ pathname: redirectPath, state: { from: pathname } }} />;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  redirectPath: PropTypes.string
};

ProtectedRoute.defaultProps = {
  redirectPath: "/user"
};

export default ProtectedRoute;
