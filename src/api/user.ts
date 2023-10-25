import request from './request';
import {APIs, IData} from './config';
import {handleError} from './handleError';
import {IUserInfo} from 'src/redux/reducers/AuthSlice';
import {IResponseApi} from './types';

export const getUserInfo = async (
  token: string,
): Promise<IResponseApi<IUserInfo>> => {
  try {
    const result = await request(token).get(`${APIs.USER}`);
    const {data} = await result;
    return {
      success: true,
      data: data,
    };
  } catch (e) {
    return handleError(e);
  }
};
export const updateUserInfo = async (
  token: string,
  id: any,
  datas: any,
): Promise<IResponseApi<IUserInfo>> => {
  try {
    const result = await request(token).put(
      `${APIs.UPDATE_USER}/update/${id}`,
      datas,
    );
    const {data} = await result;

    return {
      data: data,
      success: true,
    };
  } catch (e) {
    return handleError(e);
  }
};

export const postRegisterAccount = async (
  datas: any,
): Promise<IResponseApi<any>> => {
  try {
    const result = await request().post(`${APIs.UPDATE_USER}/adduser`, datas);
    const {data} = await result;
    return {
      data: data,
      success: true,
    };
  } catch (e) {
    return handleError(e);
  }
};

export const checkAccountExitsApi = async (
  login: any,
): Promise<IResponseApi<any>> => {
  try {
    const result = await request().get(`/api/user/checklogin?login=${login}`);
    const {data} = await result;
    return {
      data: data,
      success: true,
    };
  } catch (e) {
    // console.log('eeeee', e.response.data);
    return handleError(e);
  }
};
