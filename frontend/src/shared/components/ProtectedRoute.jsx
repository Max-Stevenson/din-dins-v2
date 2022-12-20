import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { AuthConsumer } from "../context/AuthContext";

function ProtectedRoute({ children, redirectPath = "/user" }) {
  return (
    <AuthConsumer>
      {({ isAuthenticated }) => (isAuthenticated ? children : <Navigate to={{ redirectPath }} />)}
    </AuthConsumer>
  );
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  redirectPath: PropTypes.string
};

ProtectedRoute.defaultProps = {
  redirectPath: "/user"
};
export default ProtectedRoute;
