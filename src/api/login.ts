
import { timeout } from './config';
import { createRequest } from './core';
import { handleError } from './handleError';
import { IResponseApi } from './types';

const headersLogin = {'content-type': 'application/x-www-form-urlencoded'};
export const urlLogin = 'https://www.giangmyhotpot.vn/auth/realms/giangmy/protocol/openid-connect/token';

interface ILoginRes  {
  access_token: string
  expires_in: number
  refresh_expires_in: number
  refresh_token: string
  scope:  string
  session_state: String
  token_type: string
}

export const login = async (username: string ,password : string) :  Promise<IResponseApi<ILoginRes>>  => {
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

export const refreshToken = async (refresh_token: string) : Promise<IResponseApi<ILoginRes>> => {
  try {
    const params = {
      grant_type: 'refresh_token',
      client_id: 'giangmy',
      client_secret: 'giangmy',
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

