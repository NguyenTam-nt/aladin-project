import Keycloak from "keycloak-js";
const _kc = new Keycloak({
  realm: process.env.REACT_APP_KEYCLOAK_REALM || "",
  url: process.env.REACT_APP_KEYCLOAK_URL,
  clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID || '',
});

/**
 * khởi tạo keycloak khi vừa vào ứng dụng

 */
const initKeycloak = (onAuthenticatedCallback:any) => {
  
  _kc
    .init({
      onLoad: "check-sso",
      pkceMethod: "S256",
      checkLoginIframe: false,
    })
    .then((authenticated: boolean) => {
      if (!authenticated) {
      }
      onAuthenticatedCallback()
      return _kc;
    })
    .catch();
};

const doLogin = _kc.login;

const doRegister = _kc.register;

const doLogout = _kc.logout;

const getToken = () => _kc.token;

const isLoggedIn = (): boolean => !!_kc.token;

const updateToken = (successCallback: any) =>
  _kc.updateToken(5).then(successCallback).catch(doLogin);

const getUsername = () => _kc.tokenParsed?.preferred_username;

// const refreshToken = ()=> {
//   _kc.onTokenExpired()
// }
const isTokenExpired = () => _kc.isTokenExpired;

const refreshTokenSuccess = () => _kc.onAuthRefreshSuccess;

const refreshTokenError = () => _kc.onAuthRefreshError;

const hasRole = (roles: any[]) => {
  return roles.some((role: any) => _kc.hasRealmRole(role) || _kc.hasResourceRole(role));
}

const AuthService = {
  initKeycloak,
  doLogin,
  doLogout,
  doRegister,
  isLoggedIn,
  getToken,
  updateToken,
  getUsername,
  // refreshToken,
  isTokenExpired,
  refreshTokenSuccess,
  refreshTokenError,
  hasRole,
};

export default AuthService;
