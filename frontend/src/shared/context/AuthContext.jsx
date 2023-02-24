import React, {
  useState, createContext, useContext, useMemo
} from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(Cookies.get("jwt"));
  const [userId, setUserId] = useState(null);

  const login = (passedToken, passedUserId) => {
    setToken(passedToken);
    setUserId(passedUserId);
    Cookies.set("jwt", passedToken);
    // Save the JWT in a cookie
  };

  const logout = () => {
    Cookies.remove("jwt");
    setUserId(null);
    setToken(null);
    // Remove the JWT from the cookie
  };

  const memValue = useMemo(
    () => ({
      token,
      userId,
      login,
      logout
    }),
    [token, userId]
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
