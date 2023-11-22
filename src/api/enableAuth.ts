import {APIs} from './config';
import {handleError} from './handleError';
import request from './request';
import {IResponseApi} from './types';

export const getEnableAuthAPI = async (): Promise<IResponseApi<boolean>> => {
  try {
    const result = await request().get(APIs.ENABLE_AUTH);
    const data = result.data;
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    return handleError(error);
  }
};
