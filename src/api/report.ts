import { APIs } from './config';
import { handleError } from './handleError';
import request from './request';
import { IResponseApi } from './types';

export interface IReportAll {
  name: string
  id: string
  quantity: number
  revenue: number
}

export const getReportAll = async (
  id: number | undefined,
  filter : string
): Promise<IResponseApi<IReportAll[]>> => {
  try {


    const result = await request().get(`${APIs.REPORT_ALL}/${id}/${filter}`);
    const data = await result.data;

    return {
      success: true,
      data: data,
    };
  } catch (e) {

    return handleError(e);
  }
};



