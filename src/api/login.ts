import {timeout} from './config';
import {createRequest} from './core';
import {handleError} from './handleError';
import {IResponseApi} from './types';

const headersLogin = {'content-type': 'application/x-www-form-urlencoded'};
export const urlLogin =
  'https://marketmoa.com.vn/auth/realms/plustmart/protocol/openid-connect/token';

interface ILoginRes {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  scope: string;
  session_state: String;
  token_type: string;
}

export const login = async (
  username: string,
  password: string,
): Promise<IResponseApi<ILoginRes>> => {
  try {
    const params = {
      grant_type: 'password',
      client_id: 'web_app',
      client_secret: 'web_app',
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

    console.log('data login ', data);

    return {
      success: true,
      data: data,
    };
  } catch (e) {
    return handleError(e);
  }
};

export const refreshToken = async (
  refresh_token: string,
): Promise<IResponseApi<ILoginRes>> => {
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

const data = {
  realm: 'plustmart',
  public_key:
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA+8nLzx0A+0sXIe9ZIMOoA+oTQwgsVTmDWd8JgvoqUprdISm4WopkicYtOgcYRnBpznIKW7tH2HupZZolrYmJj0OGUqrbIE/ITu1gOKguQmEU0SrRqJcjIX8ZyKCrSHA4hxZ073lxWDLWDPwGKje/QiInuy7hVfSLVM1iqhR/CaPSrP9YsETpw8DDsEdAVKmXiwnarwUgr3BqrmSoSHUAlHImVBp3q8+dCH+tBZYePToBKpLeeei+fcnYI9i1bKFbr06NrqCdc5jMvliSrZkSwxDr2A3rumAeFg3f99AVPZzxFfXAa9kleYv5FG6mx3s6XsU5gzyda07KQKOnh/sihQIDAQAB',
  'token-service':
    'https://marketmoa.com.vn/auth/realms/plustmart/protocol/openid-connect',
  'account-service': 'https://marketmoa.com.vn/auth/realms/plustmart/account',
  'tokens-not-before': 0,
};
