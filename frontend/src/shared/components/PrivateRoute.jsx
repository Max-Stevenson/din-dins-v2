import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function PrivateRoute({ component: Component, ...rest }) {
  const { userContext } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) => (userContext.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login" }}
        />
      ))}
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired
};

export default PrivateRoute;
