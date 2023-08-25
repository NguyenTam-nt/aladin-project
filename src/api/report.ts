import { ReportTimeState } from 'src/features/Report/General/components/TabBarLeftOrder';
import { APIs } from './config';
import { handleError } from './handleError';
import request from './request';
import { IResponseApi } from './types';

export interface IReportAll {
  name: string
  id: string
  quantity: number
  revenue: number
  quantityOld : number
  revenueOld : number

}

export const getReportAll = async (
  id: number | undefined,
  filter: ReportTimeState | undefined,
  startDate?: string,
  endDate?: string,
): Promise<IResponseApi<IReportAll[]>> => {
  try {
    const result = await request().get(
      `${APIs.REPORT_ALL}/${id}/${filter}?${
        startDate ? 'fromDate=' + startDate : ''
      }&${endDate ? 'toDate=' + endDate : ''}`,
    );
    const data = await result.data;
    return {
      success: true,
      data: data,
    };
  } catch (e) {
    return handleError(e);
  }
};



export interface IReportDist {
  id: string
  name: string
  quantityCancel: number | null
  quantitySuccess: number
  list: IReportDist[]
}


export const getReportDist = async (
  id: number | undefined,
  filter: ReportTimeState | undefined,
  startDate?: string,
  endDate?: string,
): Promise<IResponseApi<IReportDist[]>> => {
  try {
    const result = await request().get(`${APIs.REPORT_DIST}/${id}/${filter}`, {
      params: {
        fromDate: startDate,
        toDate: endDate,
      },
    });
    const data = await result.data;
    return {
      success: true,
      data: data,
    };
  } catch (e) {
    return handleError(e);
  }
};



