import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, redirectPath = "/user" }) {
  const auth = useAuth();
  if (!auth.user) {
    return <Navigate to={redirectPath} />;
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
