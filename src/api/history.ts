import { IHistory, IHistoryCompoumd, IParams } from '@typeRules';
import { APIs } from './config';
import { handleError } from './handleError';
import request from './request';
import { IResponseApi } from './types';

  export const getHistories = async (params: IParams):Promise<IResponseApi<IHistory>> => {
    console.log(`${APIs.HISTORY}/kitchen/v2`, {params});
    try {
      const result = await request().get(`${APIs.HISTORY}/kitchen/v2`, {
        params: {...params},
      });
      const data = await result.data.list;
      return {
        success: true,
        data: data,
      };
    } catch (e) {
      return handleError(e);
    }
  };

  export interface IHistoryDay {
    day : string
  }

  export const getHistories3 = async (params: IParams):Promise<IResponseApi<IHistoryDay>> => {
    try {
      const result = await request().get(`${APIs.HISTORY}/kitchen/group/v3`, {
        params: {...params},
      });
      const data = await result.data.list;
      return {
        success: true,
        data: data,
      };
    } catch (e) {
      return handleError(e);
    }
  };


  export const getHistoriesContent = async (params: IParams):Promise<IResponseApi<IHistoryCompoumd[]>> => {
    try {
      const result = await request().get(`${APIs.HISTORY}/kitchen/v3`, {
        params: {...params},
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
