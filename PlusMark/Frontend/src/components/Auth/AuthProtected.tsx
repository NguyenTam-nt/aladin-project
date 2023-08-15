import { Outlet } from "react-router-dom";
import AuthService from "@services/AuthServices";
import { useEffect } from "react";

const AuthProtected = () => {
  const requireLogin = () => {
    if (!AuthService.isLoggedIn()) {
      AuthService.doLogin();
    }
  };
  useEffect(() => {
    requireLogin();
  }, []);
  return <Outlet />;
};

export default AuthProtected;
