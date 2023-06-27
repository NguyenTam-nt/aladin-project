
export type BillType = "RESTAURANT" | "PACK"
export type BillStatus = "WAIT" | "COMPLETE" | "CANCEL"

export interface IBillGet {
  id: number
  fullname: string
  phone: string
  chooseDate: string
  createdDate: string
  status: BillStatus
}


export interface IBill {
  id?: number | null
  fullname: string
  phone: string
  email: string
  type: BillType
  chooseDate: string
  status?: string
  note: string,
  infrastructure?: string,
  idInfrastructure: number
  price: number
  listProduct: IBillProduct[]
  voucher: IBillVoucher | null
}

export interface IBillProduct {
  id: number
  name: string
  num: number
  price: number
  linkMedia: string
  pricePromotion: number
}

export interface IBillVoucher {
  id?: number
  code: string
  price: number
}

export interface IBillDetail {
  id: number
  fullname: string
  phone: string
  email: string
  type: BillType
  chooseDate: string
  status: string
  note: string,
  infrastructure?: string,
  idInfrastructure: number
  price: number
  createdDate: string
  discount: 2000,
  priceAll: 38000,
  listProduct: IBillProduct[],
  voucher: IBillVoucher
}

export const BillTypeContants: {restaurant: BillType, pack: BillType} = {
  restaurant: "RESTAURANT",
  pack: "PACK"
}

export const BillStatusContants: {wait: BillStatus, complete: BillStatus, cancel: BillStatus} = {
  wait: "WAIT",
  cancel: "CANCEL",
  complete: "COMPLETE"
}