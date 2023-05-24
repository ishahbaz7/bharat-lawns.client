import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import dayjs from "dayjs";

const useAuth = () => {
  const { user, setUser, cookie } = useContext(AuthContext);

  const login = (data) => {
    cookie.set(
      "user",
      { ...data, expiration: dayjs(data.expiration) },
      {
        expires: new Date(data.expiration),
        path: "/",
      }
    );
    setUser(data);
  };

  const logout = () => {
    setUser(null);
    cookie.remove("user", { path: "/" });
  };

  function isInRole(role) {
    var isInRole = false;
    if (typeof role == "string") {
      isInRole = !!user?.roles?.includes(role);
    } else {
      isInRole = !!role?.find((r) => user?.roles?.includes(r));
    }
    return isInRole;
  }

  return { login, logout, user, setUser, cookie, isInRole };
};

export default useAuth;
