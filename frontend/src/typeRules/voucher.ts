
export type VoucherType = "MONEY" | "PERCENT"
export type VoucherPercentType = "NONE" | "LIMIT" | "UNLIMIT"

export const VOUCHER_TYPE: {money: VoucherType, percent: VoucherType} = {
  money: "MONEY",
  percent: "PERCENT"
}

export const VOUCHER_PERCENT_TYPE: {none: VoucherPercentType, limit: VoucherPercentType, unlimit: VoucherPercentType} = {
  none: "NONE",
  limit: "LIMIT",
  unlimit: "UNLIMIT"
}

export const VOUCHER_STATE = {
  running: "HAPPENING",
  waiting: "NOT_HAPPEN",
  end: "FINISHED"
}

export type IVoucher = {
  id?: number
  name: string
  code: string
  startDate: string
  endDate: string
  value: number
  typeVoucher: VoucherType
  typePercent: VoucherPercentType
  minBill: number
  numBill: number
  minPrice: number
  used?: number
}

export type IVoucherGet = {
  id?: number
  name: string
  code: string
  startDate: string
  endDate: string
  value: number
  numBill: number
  used: number
  voucherState: string
}


export type VoucherCheckPriceDTO = {
  code: string
  price: number
}
