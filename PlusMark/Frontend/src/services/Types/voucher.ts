export interface IVoucher {
    id: number,
    voucherName: string,
    voucherCode: string,
    startDate: any,
    endDate: any,
    typeVoucher: string,
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