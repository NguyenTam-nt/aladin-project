import Keycloak from 'keycloak-js'

const _kc = Keycloak({
  url: `https://ssa.cloudata.vn/auth`,
  clientId: 'giangmy',
  realm: 'giangmy',
})

/**
 * khởi tạo keycloak khi vừa vào ứng dụng

 */
const initKeycloak = (onAuthenticatedCallback: any) => {
  _kc
    .init({
      // onLoad: 'check-sso',
      checkLoginIframe: false,
      pkceMethod: 'S256',
    })
    .then((authenticated: boolean) => {
      if (!authenticated) {
      }
      const {token} = _kc
      if (authenticated && token) {
        localStorage.setItem('accessToken', token)
      }
      return _kc
    })
    .finally(() => {
        onAuthenticatedCallback()
    })
}

const doLogin = _kc.login

const doLogout = _kc.logout

const getToken = () => _kc.token

const isLoggedIn = (): boolean => !!_kc.token

const updateToken = (successCallback: any) =>
  _kc
    .updateToken(5)
    .then(successCallback)

    .catch(doLogin)

const getUsername = () => _kc.tokenParsed?.preferred_username

const isTokenExpired = () => _kc.isTokenExpired

const refreshTokenSuccess = () => _kc.onAuthRefreshSuccess

const refreshTokenError = () => _kc.onAuthRefreshError

const hasRole = (roles: any) =>
  roles.some((role: any) => _kc.hasRealmRole(role))

const authService = {
  initKeycloak,
  doLogin,
  doLogout,
  isLoggedIn,
  getToken,
  updateToken,
  getUsername,
  isTokenExpired,
  refreshTokenSuccess,
  refreshTokenError,
  hasRole,
}

export default authService
