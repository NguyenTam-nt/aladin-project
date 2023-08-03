import type {ICategory, ICategoryItem} from './category'

export interface CheckType {
  status: number
  message: string
  location: string
}

export interface IListInfrastructure {
  id?: number
  name?: string
}

export enum MediaType {
  image = 'IMAGE',
  video = 'VIDEO',
}

export interface IListMedia {
  id?: number | null
  linkMedia?: string
  type?: MediaType
}

export interface IProduct {
  id?: number | null
  code: string
  name: string
  price: string
  pricePromotion: string
  description: string
  percent?: number
  category?: ICategoryItem
  listInfrastructure?: IListInfrastructure[]
  listMedia?: IListMedia[]
  linkMedia?: string
  priority?: boolean
  show?: boolean
  quantity?: number
  isStar?: boolean
  guide?: string
}

export interface IProductHome {
  category: ICategory
  listProduct: IProduct[]
}

export enum OrderType {
  complete = 'COMPLETE',
  cancel = 'CANCEL',
  process_cancel = 'PROCESSING_CANCEL',
  process = 'PROCESSING',
}

export interface IOrderItem {
  id: number
  idProduct: number
  numProduct: number
  createdDate: string
  nameTable: string
  idInvoice: number
  createdBy: string
  linkImage: string
  nameProduct: string
  price: number
  pricePromotion: number
  state: OrderType
  guide: null
}

export type IOrderKitchen = {
  idProduct: number
  nameProduct: string
  idInvoice: number
  nameTable: string
  num: number
  list: IOrderItem[]
}
