import queryString from "query-string";
import { APIs } from "./config";
import { handleError } from "./handleError";
import request from "./request";
import { IResponseApi } from "./types"

interface IVoucher {

}

export const getVoucherApplyProductApi = async (ids: any[], priceBill: number): Promise<IResponseApi<IVoucher[]>> => {
    try {
        const result = await request().get(`${APIs.VOUCHER_APPLY}??${queryString.stringify({productDetailIds: ids},{ arrayFormat: "comma", skipNull: true })}&priceBill=${priceBill}`);
        const data = await result.data.content;

        return {
            success: true,
            data: data,
        };
    } catch (error) {
        return handleError(error);
    }
}