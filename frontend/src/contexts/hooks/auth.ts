import { AuthContext } from "@contexts/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
  const { isLogin, user, hasRole, doLogin, doLogout, updateUser, loading } =
    useContext(AuthContext);

  return {
    isLogin,
    user,
    hasRole,
    doLogin,
    doLogout,
    updateUser,
    loading
  };
};
