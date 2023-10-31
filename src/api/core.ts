import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
} from 'axios';
import store from 'src/redux';
import {setRefreshToken, setToken} from 'src/redux/reducers/AuthSlice';
import {refreshToken, urlLogin} from './login';
import {MessageUtils} from 'src/commons/messageUtils';
// import { RefNavigationToLoginScreen } from 'src/navigations/DrawerMain';
const {CancelToken} = axios;
const source = CancelToken.source();

const logout = () => {
  // RefNavigationToLoginScreen?.current?.GotoLoginScreen();
};

const ShowMessageRefreshTokenError = () => {
  MessageUtils.showErrorMessage(
    'Không thể refresh token, thực hiện đăng nhập lại!',
  );
};

const axiosInstance = axios.create();
axiosInstance.interceptors.response.use(
  response => {
    // Nếu phản hồi thành công, trả về phản hồi
    return response;
  },
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && originalRequest.baseURL !== urlLogin) {
      // Nếu có lỗi 401, thực hiện refresh token
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        const refresh_token = store.getState().appInfoReducer.refreshToken;
        try {
          const res = await refreshToken(refresh_token);
          if (res.success) {
            // Cập nhật token mới vào header của originalRequest
            originalRequest.headers.Authorization = `Bearer ${res.data.access_token}`;
            // Cập nhật token và refresh token mới
            store.dispatch(setRefreshToken(res.data.refresh_token));
            store.dispatch(setToken(res.data.access_token));
            // Thực hiện lại request ban đầu với token mới
            return axiosInstance(originalRequest);
          } else {
            // refresh token thất bại
            ShowMessageRefreshTokenError();
            logout();
          }
        } catch (e) {
          // Nếu có lỗi khác khi refresh token
          ShowMessageRefreshTokenError();
          logout();
        }
      } else {
        // Nếu retry token không thành công, thực hiện logout
        ShowMessageRefreshTokenError();
        logout();
      }
    }
    // Nếu không phải lỗi 401 hoặc refresh token không thành công, throw error
    throw error;
  },
);

/**
 * tạo ra 1 func request api dựa vào axios
 * @param baseUrl
 * @param timeout
 */
export const createRequest = (baseUrl: string, timeout: number) => {
  return (
    authToken?: string | undefined,
    cancelToken?: CancelTokenSource | undefined,
  ) => {
    console.log('baseurl', baseUrl);

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const tokenUser = store.getState().appInfoReducer.token;
    if (tokenUser) {
      // @ts-ignore
      headers.Authorization = `Bearer ${tokenUser}`;
    }
    const defaultOptions: AxiosRequestConfig = {
      headers,
      baseURL: baseUrl,
      timeout,
      cancelToken: cancelToken ? cancelToken.token : source.token,
    };
    return {
      /**
       * func get
       * override option request
       */
      get: <T = any, R = AxiosResponse<T>>(
        url: string,
        options: AxiosRequestConfig = {},
      ) => {
        console.log('url', url);

        return axiosInstance.get<T, R>(url, {
          // ...options.params,
          ...defaultOptions,
          ...options,
          headers: {
            ...defaultOptions.headers,
            ...options?.headers,
          },
        });
      },
      /**
       * func post
       * override option request
       */
      post: <T = any, R = AxiosResponse<T>>(
        url: string,
        data?: any,
        options: AxiosRequestConfig = {},
      ) => {
        return axiosInstance.post<T, R>(url, data, {
          ...defaultOptions,
          ...options,
          headers: {
            ...defaultOptions.headers,
            ...options?.headers,
          },
        });
      },
      /**
       * func put
       * override option request
       */
      put: <T = any, R = AxiosResponse<T>>(
        url: string,
        data?: any,
        options: AxiosRequestConfig = {},
      ) => {
        console.log(url);

        return axiosInstance.put<T, R>(url, data, {
          ...defaultOptions,
          ...options,
          headers: {
            ...defaultOptions.headers,
            ...options?.headers,
          },
        });
      },
      /**
       * func put
       * override option request
       */
      patch: <T = any, R = AxiosResponse<T>>(
        url: string,
        data?: any,
        options: AxiosRequestConfig = {},
      ) =>
        axiosInstance.patch<T, R>(url, data, {
          ...defaultOptions,
          ...options,
          headers: {
            ...defaultOptions.headers,
            ...options?.headers,
          },
        }),

      /**
       * func delete
       * override option request
       */
      delete: <T = any, R = AxiosResponse<T>>(
        url: string,
        data?: any,
        options: AxiosRequestConfig = {},
      ) =>
        axiosInstance.delete<T, R>(url, {
          data: {
            ...data,
          },
          ...defaultOptions,
          ...options,
          headers: {
            ...defaultOptions.headers,
            ...options?.headers,
          },
        }),
    };
  };
};
