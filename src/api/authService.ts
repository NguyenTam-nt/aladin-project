import {useKeycloak} from '@react-keycloak/native';
import {RNKeycloak} from '@react-keycloak/native';
import axios from 'axios';

export const keycloak = new RNKeycloak({
  url: 'https://marketmoa.com.vn/auth',
  realm: 'plustmart',
  clientId: 'web_app',
});

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

  const dologout = (refresh_token: string) => {
    // const options = {
    //   method: 'post',
    //   url: '/login',
    //   data: {
    //     client_id: 'web_app',
    //     refresh_token: refresh_token,
    //   },
    //   headers:{
    //     Content-Type: 'application/x-www-form-urlencoded'
    //   }
    // };
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    axios.post(
      'https://marketmoa.com.vn/auth/realms/plustmart/protocol/openid-connect/logout?redirect_uri=encodedRedirectUri',
      {
        client_id: 'web_app',
        refresh_token: refresh_token,
      },
      {
        headers: headers,
      },
    );
    keycloak?.logout();
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
        //redirectUri : 'https://marketmoa.com.vn/auth',
      })
      .then(e => console.log('eeee', e));
  };

  const doLoginFacebook = () => {
    keycloak?.login({idpHint: 'facebook', locale: 'en'});
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
