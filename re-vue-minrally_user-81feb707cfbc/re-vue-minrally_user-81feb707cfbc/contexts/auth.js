import {
  clearCredentials,
  retrieveCredentials,
  storeCredentials
} from "@utils/storage/auth";
import {
  clearUserInfo,
  retrieveUserInfo,
  ROLE,
  storeRole,
  storeUserInfo
} from "@utils/storage/user";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [redirectable, setRedirectable] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  let role = ROLE.guest;

  useEffect(() => {
    setIsLoggedIn(!!retrieveCredentials());
    setUser(retrieveUserInfo());
    setRedirectable(true);
  }, []);

  const logUserIn = auth => {
    storeCredentials(auth.credentials);
    storeUserInfo(auth.user);
    setIsLoggedIn(true);
    setUser(auth.user);

    // Authorization

    if (auth.user?.is_creator) role = ROLE.creator;
    else role = ROLE.player;
    storeRole(role);
  };

  const logUserOut = () => {
    clearCredentials();
    clearUserInfo();
    setIsLoggedIn(false);
    setUser({});
    storeRole(ROLE.guest);
  };

  const updateUserInfo = value => {
    storeUserInfo(value);
    setUser(value);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        redirectable,
        setRedirectable,
        logUserIn,
        logUserOut,
        user,
        updateUserInfo
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
