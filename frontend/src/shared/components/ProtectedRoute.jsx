import React from "react";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, redirectPath = "/user" }) {
  const auth = useAuth();
  const location = useLocation();
  const { pathname } = location;

  if (!auth.token) {
    return <Navigate to={{ pathname: redirectPath, state: { from: pathname } }} />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  redirectPath: PropTypes.string
};

ProtectedRoute.defaultProps = {
  redirectPath: "/user"
};

export default ProtectedRoute;
