import axios from "axios";
import authService from "@services/keycloakService";
import { prefixRootRoute } from "@constants/index";
// import UserService from "../../services/UserService";

const axiosClient = axios.create();

const getAccessToken = async () => {
  if (localStorage.getItem("accessToken"))
    return localStorage.getItem("accessToken");

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(null);
    }, 10000);

    const token = localStorage.getItem("accessToken");
    resolve(token);

    clearTimeout(timeout);
  });
};

const configure = () => {
  axiosClient.interceptors.request.use(async (config: any) => {
    config.headers["Accept-Language"] = "en";
    const { url } = config;

    if(url !== "/services/account/api/user" && url !== "/services/media/api/upload-image" && url !== "/services/media/api/upload-video") {
      if (
        (!url.includes("admin"))
      ) {
        return config;
      }

    }
    // if (UserService.isLoggedIn()) {
    //   const cb = () => {
    //     config.headers.Authorization = `Bearer ${UserService.getToken()}`;
    //     return Promise.resolve(config);
    //   };

    //     return UserService.updateToken(cb);

    // }
    
    const token = await getAccessToken();

    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }

    return config;
  });
};

axiosClient.interceptors.response.use(
  async (response) => {
    const total = response.headers["x-total-count"];
    if (total) {
      return {
        total,
        data: response.data,
      };
    }
    return response.data;
  },
  function (error) {
    const { status } = error.response;
    if (window.document.location.pathname.includes(prefixRootRoute.admin)) {
      if (status === 401 || status === 403) {
        // window.location.href = "/"
        authService.doLogin();
      }
    }
    return Promise.reject(error);
  }
);

const HttpService = {
  configure,
  axiosClient,
};

export default HttpService;
