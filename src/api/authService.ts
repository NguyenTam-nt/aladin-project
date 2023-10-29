import { useKeycloak } from "@react-keycloak/native";

const { keycloak } = useKeycloak();

const initKeycloak = {
    redirectUri: 'MarketMoa://profile',
    // if you need to customize "react-native-inappbrowser-reborn" View you can use the following attribute
    inAppBrowserOptions: {
        // For iOS check: https://github.com/proyecto26/react-native-inappbrowser#ios-options
        // For Android check: https://github.com/proyecto26/react-native-inappbrowser#android-options
    },
    onLoad: 'check-sso',
    pkceMethod: 'S256',
}
const doLogin = keycloak?.login;

const dologout = keycloak?.logout;

const doLoginGoogle = () => {
    keycloak?.login({ idpHint: 'google', prompt: 'login', locale: 'en' });
}

const doLoginFacebook = () => {
    keycloak?.login({ idpHint: 'facebook', locale: 'en' });
}

const isLoggedIn = (): boolean => !!keycloak?.token;

const updateToken = (successCallback: any) =>
    keycloak?.updateToken(5)
        .then(successCallback)

        .catch(doLogin);

const isTokenExpired = () => keycloak?.isTokenExpired;

const refreshToken = () => {
    keycloak?.onTokenExpired?.();
}
const refreshTokenSuccess = () => keycloak?.onAuthRefreshSuccess;

const refreshTokenError = () => keycloak?.onAuthRefreshError;

const getTokenParsed = () => keycloak?.tokenParsed;

const hasRole = (roles: any) => roles.some((role: any) => keycloak?.hasRealmRole(role))

const getUsername = () => keycloak?.tokenParsed?.session_state

const authenticated = keycloak?.authenticated;
export const AuthServices = {
    initKeycloak,
    doLogin,
    doLoginGoogle,
    doLoginFacebook,
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
    authenticated
}