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
