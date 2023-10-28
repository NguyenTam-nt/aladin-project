import {APIs} from './config';
import request from './request';
import {IResponseApi, Image} from './types';
import {handleError} from './handleError';

export interface IAbout {
  id?: number;
  name: string;
  titleVn: string;
  titleKr: string;
  content1Vn: string;
  content1Kr: string;
  content2Vn: string;
  content2Kr: string;
  images: Image[];
}
export const getAboutApi = async (): Promise<IResponseApi<IAbout[]>> => {
  try {
    const result = await request().get(`${APIs.ABOUT}`);
    const data = await result.data;
    // console.log({data});

    return {
      success: true,
      data: data,
    };
  } catch (e) {
    return handleError(e);
  }
};
