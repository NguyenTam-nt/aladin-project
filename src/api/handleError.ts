import axios from 'axios';
import type {ApiResponse} from './types';

export const handleError: (error: any) => ApiResponse<any> = error => {
  if (axios.isCancel(error)) {
    return {
      status: 0,
      success: false,
      data: error?.response?.data,
      code: 301,
      message: 'Hủy api',
      cancel: true,
    };
  }
  if (axios.isAxiosError(error)) {
    if (
      error?.response?.status === 401 &&
      error?.response?.config.method === 'post'
    ) {
      return {
        status: 0,
        cancel: false,
        data: error?.response?.data,
        // @ts-ignore
        code: error?.response?.status || 500,
        message:
          // @ts-ignore
          (error?.response?.data?.message as string) ||
          'Hệ thống đang có lỗi xảy ra, quý khách vui lòng thử lại',
      };
    }
    return {
      status: 0,
      cancel: false,
      data: error?.response?.data,
      // @ts-ignore
      code: error?.response?.data.code || error?.response?.status || 500,
      message:
        // @ts-ignore
        (error?.response?.data?.message as string) ||
        'Hệ thống đang có lỗi xảy ra, quý khách vui lòng thử lại',
    };
  }
  return {
    status: 0,
    cancel: false,
    message: 'đã có lỗi xảy ra',
    code: 101,
    data: error?.response?.data,
  };
};
