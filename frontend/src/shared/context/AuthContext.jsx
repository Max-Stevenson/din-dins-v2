import { createContext } from "react";

const AuthContext = createContext({
  isAuthenticated: true,
  signIn: () => {},
  signOut: () => {}
});

export default AuthContext;
