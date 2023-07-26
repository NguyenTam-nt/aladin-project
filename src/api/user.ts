import request from './request';
import { APIs, IData } from './config';
import { handleError } from './handleError';
import { IUserInfo } from 'src/redux/reducers/AuthSlice';

export const getUserInfo = async (token: string) : Promise<IData<IUserInfo>> => {
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

