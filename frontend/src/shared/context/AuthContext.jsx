import React, {
  useState, createContext, useContext, useMemo
} from "react";
import PropTypes from "prop-types";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userValue) => {
    setUser(userValue);
  };

  const logout = () => {
    setUser(null);
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
