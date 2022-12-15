/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import AuthContext from "../context/AuthContext";

function ProtectedRoute({ redirectPath = "/user", children }) {
  const { isLoggedIn } = useContext(AuthContext);
  if (!isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
}

ProtectedRoute.propTypes = {
  redirectPath: PropTypes.string,
  children: PropTypes.element.isRequired
};

ProtectedRoute.defaultProps = {
  redirectPath: "/user"
};

export default ProtectedRoute;
