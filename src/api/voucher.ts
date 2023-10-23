import queryString from 'query-string';
import {APIs} from './config';
import {handleError} from './handleError';
import request from './request';
import {IResponseApi} from './types';

export interface IVoucher {
  id: number;
  voucherName: string;
  voucherCode: string;
  startDate: string;
  endDate: string;
  typeVoucher: string;
  value: number;
  total: number;
  usedTotal: number;
  userLimit: number;
  minBill: number;
  maxValue: number;
  typeApply: string;
  voucherState: string;
}

export const getVoucherApplyProductApi = async (
  ids: any[],
  priceBill: number,
): Promise<IResponseApi<IVoucher[]>> => {
  try {
    const result = await request().get(
      `${APIs.VOUCHER_APPLY}?${queryString.stringify(
        {productDetailIds: ids},
        {arrayFormat: 'comma', skipNull: true},
      )}&priceBill=${priceBill}`,
    );
    const data = await result.data;
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    return handleError(error);
  }
};
