import {useKeycloak} from '@react-keycloak/native';

export const AuthServices = () => {
  const {keycloak} = useKeycloak();
  const initKeycloak = {
    redirectUri: 'marketmoa://profile',
    endpoints: 'realms/plustmart/protocol/openid-connect',
    enableLogging: true,
    inAppBrowserOptions: {
      // For iOS check: https://github.com/proyecto26/react-native-inappbrowser#ios-options
      // For Android check: https://github.com/proyecto26/react-native-inappbrowser#android-options
    },
  };

  const doLogin = () => keycloak?.login();

  const dologout = () => {
    keycloak?.clearToken();
  };
  const doLoginGoogle = () => {
    keycloak
      ?.login({
        idpHint: 'google',
        prompt: 'login',
        locale: 'en',
        scope: 'profile',
        onLoad: 'check-sso',
        pkceMethod: 'S256',
      })
      .then(e => console.log('eeee', e));
  };

  const doLoginFacebook = () => {
    keycloak?.login({idpHint: 'facebook', prompt: 'login', locale: 'en'});
  };

  const isLoggedIn = (): boolean => !!keycloak?.token;

  const updateToken = (successCallback: any) =>
    keycloak
      ?.updateToken(5)
      .then(successCallback)

      .catch(doLogin);

  const isTokenExpired = () => keycloak?.isTokenExpired;

  const refreshToken = () => {
    keycloak?.onTokenExpired?.();
  };
  const refreshTokenSuccess = () => keycloak?.onAuthRefreshSuccess;

  const refreshTokenError = () => keycloak?.onAuthRefreshError;

  const getTokenParsed = () => keycloak?.tokenParsed;

  const hasRole = (roles: any) =>
    roles.some((role: any) => keycloak?.hasRealmRole(role));

  const getUsername = () => keycloak?.tokenParsed?.session_state;

  const authenticated = keycloak?.authenticated;
  return {
    initKeycloak,
    doLogin,
    doLoginFacebook,
    doLoginGoogle,
    dologout,
    getTokenParsed,
    getUsername,
    isLoggedIn,
    hasRole,
    refreshToken,
    refreshTokenError,
    refreshTokenSuccess,
    isTokenExpired,
    updateToken,
    authenticated,
  };
};
