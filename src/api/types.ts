import type {CancelTokenSource} from 'axios';
export interface IResponseApi<T> {
  success?: boolean
  data: T
  message?: string
  status?: number | string
  page?: {
    current: number
    max: number
  }
  count?: number
}
export interface IParamBase {
  authen?: string
  page?: number | string
  limit?: number | string
  id?: number | string
}

export interface PayloadBase extends IParamBase {
  cancelToken?: CancelTokenSource
  language?: string
  deviceLanguage?: boolean
}

export interface ApiResponse<T> extends IResponseApi<T> {
  cancel?: boolean
  code: number
}

export interface AddressReq {
  [x: string]: any
}
