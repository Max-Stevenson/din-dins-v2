import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";

const AuthContext = React.createContext({
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {}
});

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authenticate = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      authenticate,
      logout
    }),
    [isAuthenticated]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer };
