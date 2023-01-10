import React, {
  useState, createContext, useContext, useMemo
} from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load the JWT from a cookie, if it exists
  const jwt = Cookies.get("jwt");
  if (jwt) {
    setUser(jwt);
  }

  const login = (userValue) => {
    setUser(userValue);
    // Save the JWT in a cookie
    Cookies.set("jwt", userValue, { expires: 7 }); // expires in 7 days
  };

  const logout = () => {
    setUser(null);
    // Remove the JWT from the cookie
    Cookies.remove("jwt");
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
