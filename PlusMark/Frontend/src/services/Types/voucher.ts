import { DISCOUNT_TYPE } from "@components/AdminComponents/VoucherEditComponent"

export interface IVoucher {
    id: number,
    voucherName: string,
    voucherCode: string,
    startDate: any,
    endDate: any,
    typeVoucher: DISCOUNT_TYPE,
    value: number,
    maxValue: number,
    total: number,
    usedTotal: number,
    userLimit: number,
    minBill: number,
    typeApply: string,
    voucherState: string,
    productVouchers: []
}

export interface IProductVoucher {
    productId: number,
    productNameVn: string,
    productNameKr: string,
    cost: number,
    price: number,
    promo: number,
    addressWarehouse: string,
    quantity: number,
    images: [
        { url: string }
    ]
}