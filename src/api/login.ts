
import { timeout } from './config';
import { createRequest } from './core';
import { handleError } from './handleError';

const headersLogin = {'content-type': 'application/x-www-form-urlencoded'};
const urlLogin = 'https://www.giangmyhotpot.vn/auth/realms/giangmy/protocol/openid-connect/token';

export const login = async (username: string ,password : string) => {
  try {
    const params = {
      grant_type: 'password',
      client_id: 'giangmy',
      client_secret: 'giangmy',
      username: username.trim(),
      password: password?.trim(),
    };
    const dataLogin = Object.keys(params)
      //@ts-ignore
      .map(key => `${key}=${encodeURIComponent(params[key])}`)
      .join('&');

    const requestLogin = await createRequest(urlLogin, timeout);

    const result = requestLogin().post('', dataLogin, {
      headers: headersLogin,
    });
    const {data} = await result;

    return {
      success: true,
      data: data,
    };
  } catch (e) {
    return handleError(e);
  }
};

export const refreshToken = async (refresh_token: string) => {
  try {
    const params = {
      grant_type: 'refresh_token',
      client_id: 'web_app',
      client_secret: 'web_app',
      refresh_token: refresh_token,
    };
    const dataLogin = Object.keys(params)
      //@ts-ignore
      .map(key => `${key}=${encodeURIComponent(params[key])}`)
      .join('&');

    const requestLogin = await createRequest(urlLogin, timeout);
    const result = requestLogin().post('', dataLogin, {
      headers: headersLogin,
    });
    const {data} = await result;

    return {
      success: true,
      data: data,
    };
  } catch (e) {
    return handleError(e);
  }
};

