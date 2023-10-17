import {handleError} from './handleError';
import request from './request';
import {IResponseApi} from './types';
import {APIs} from './config';
export interface IContact {
  id?: number;
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
  content: string;
  replyContent?: string;
  status?: string;
  createAt?: string;
}
export const postContactApi = async (
  body: IContact,
): Promise<IResponseApi<IContact>> => {
  try {
    const result = await request().post(`${APIs.CONTACT}`, body);
    const data = await result.data;
    return {
      success: true,
      data: data,
    };
  } catch (e) {
    return handleError(e);
  }
};
