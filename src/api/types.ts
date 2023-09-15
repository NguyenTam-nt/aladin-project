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
  code? : number
  [key: string]: any
}

export interface IResponseApiPM<T> {
  content: T,
  totalPages?: number,
  totalElements?: number,
  [key: string]: any
}

export interface IParamBase {
  authen?: string
  page?: number | string
  limit?: number | string
  id?: number | string
}

export interface IPrams{
  page?: number | string,
  size?: number |  string,
  sort?: string,
  [key:string]: any
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
export interface Image {
  url: string
}
