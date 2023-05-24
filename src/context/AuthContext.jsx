import dayjs from "dayjs";
import React, { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "universal-cookie";


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const cookie = new Cookies();
  const [user, setUser] = useState(cookie.get("user") || null);
  const { pathname } = useLocation();

  useEffect(() => {
    var userCookie = cookie.get("user");
    if (dayjs().isAfter(user?.expiration)) {
      cookie.remove("user");
      setUser(null);
    }
    setUser(userCookie);
  }, [pathname]);
  return (
    <AuthContext.Provider value={{ user, setUser, cookie }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
