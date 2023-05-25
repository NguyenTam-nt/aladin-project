import {ReactNode, createContext, useState} from 'react'
import authService from '@services/keycloakService'
import type { IUser } from '@typeRules/user'


interface AuthState {
  user: IUser | null
//   hasRole: (roles: string[]) => boolean
  isLogin: boolean
  doLogin: () => void
  doLogout: () => void
}

export const AuthContext = createContext<AuthState>({
  user: null,
//   hasRole: () => false,
  doLogin: () => {},
  doLogout: () => {},
  isLogin: false,
})

type Props = {
  children: ReactNode
}

export default function AuthProvider({children}: Props) {
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem('accessToken'))
  const [user] = useState<IUser>(
    JSON.parse(localStorage.getItem('account') + '') || null
  )

  const doLogin = () => authService.doLogin()
  const doLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('account')
    setIsLogin(false)
    if (authService.isLoggedIn()) {
      authService.doLogout()
    }
  }

//   useEffect(() => {
//     userService
//       .getCurrentProfile()
//       .then((user) => {
//         setUser(user)
//         localStorage.setItem('account', JSON.stringify(user))
//         setIsLogin(true)
//       })
//       .catch((error) => {
//         const status = error.response.status
//         if (status === 403 || status === 401) {
//           doLogout()
//         }
//       })
//   }, [])

//   const hasRole = (roles: string[]) => {
//     return roles.some((role) => role === user.)
//   }


  return (
    <AuthContext.Provider
      value={{
        isLogin,
        user,
        // hasRole,
        doLogin,
        doLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
