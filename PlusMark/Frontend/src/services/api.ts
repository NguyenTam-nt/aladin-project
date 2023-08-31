import { BASE_URL } from "@utility/constants";
import axios from "axios";
import AuthService from "./AuthServices";

const api = axios.create();
api.interceptors.request.use(
  function (config:any) {
    const urlConfig =BASE_URL + config.url;
    let newConfig = {
      ...config,
      url:urlConfig
    }
    if(urlConfig.includes('image')){
      newConfig.headers = {
        ...config.headers,
        'Content-Type': 'multipart/form-data'
      }
    
  }
    
    // Do something before request is sent
    
    
    if (AuthService.isLoggedIn()) {
      config.headers.Authorization = `Bearer ${AuthService.getToken()}`;
      // const cb = () => {
      //   config.headers.Authorization = `Bearer {AuthService.getToken()}`;
      //   return Promise.resolve(config);
      // };

      // return AuthService.updateToken(cb);??
    }
    if(config.url.includes('/excelpayment')){
      config.responseType = "blob"
    }

    return {...newConfig}
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
export default api;
