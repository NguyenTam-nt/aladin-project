import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

interface AuthContext {
  isLogin: boolean;
  login: () => void;
}

export const AuthContext = React.createContext<AuthContext>({
  isLogin: false,
  login: () => {},
});

const AuthProvider = (props: Props) => {
  const navigate = useNavigate();
  const { children } = props;
  const [isLogin, setIslogin] = useState<boolean>(true);

  const login = () => {
    setIslogin(true);
    navigate("/test");
  };
  const valueContext = {
    isLogin,
    login,
  };

  // useEffect(() => {
  //   AuthService.initKeycloak();
  // }, []);
  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
