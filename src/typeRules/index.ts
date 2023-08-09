import {OrderType} from './product'

export interface IIcon {
  width?: number
  color?: string
  height?: number
}

export interface IParams {
  page?: string | number
  size?: number
  sort?: string | string[]
  [key: string]: any | undefined
}

export interface IResponseData<T> {
  totalElement: number
  totalElementPage: number
  list: T[]
}
export interface ListRenderItemInfo<ItemT> {
  item: ItemT

  index: number

  separators: {
    highlight: () => void
    unhighlight: () => void
    updateProps: (select: 'leading' | 'trailing', newProps: any) => void
  }
}

export interface INotice {
  state: boolean
  idInfrastructure: number
  idInvoice: number
  reason: string
}

export interface IHistory {
  createdBy: string
  createdDate: string
  id: number
  idInvoice: number
  idProduct: number
  lastModifiedBy: string
  lastModifiedDate: string
  nameProduct: string
  nameTable: string
  numProduct: string
  reason: string
  state: OrderType
  status: boolean
  thour: string
}
