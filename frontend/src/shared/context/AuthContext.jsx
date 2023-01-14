import React, {
  useState, createContext, useContext, useMemo
} from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(Cookies.get("jwt"));

  // Load the JWT from a cookie, if it exists
  const login = (userValue) => {
    setUser(userValue);
    Cookies.set("jwt", userValue);
    // Save the JWT in a cookie
  };

  const logout = () => {
    setUser(null);
    // Remove the JWT from the cookie
  };

  const memValue = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={memValue}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useAuth = () => useContext(AuthContext);
