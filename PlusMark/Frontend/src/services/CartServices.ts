import { some } from "@utility/helper";
import api from "./api";

const apiCart = "/checkpayment"

export type CartItemRequest = {
    itemId: string,
    itemName: string,
    image: string,
    size: string,
    color: string,
    price: number,
    total: number,
    sku: string
}

export type CheckVoucherRequest = {
    itemsCartList: CartItemRequest[],
    voucher: string
}

export type PaymentOrderRequest = {
    itemsCartList: CartItemRequest[],
    paymentMethod: string,
    customer: {
        fullname: string,
        phoneNumber: string,
        email: string,
        address: string,
        province: string,
        district: string,
        commune: string
    },
    voucher: string
}

const CartServices = {
 
    checkVoucherApi: async (data: CheckVoucherRequest): Promise<some> => {

        return api.post("/checkpayment", data).then(data => data.data)
    },

    paymentOrderApi: async (data: CheckVoucherRequest): Promise<some> => {

        return api.post("/payment", data).then(data => data.data)
    },

    getAllCartItems: async (): Promise<CartItemRequest[]> => {

        return api.get("/cart").then(data => data.data).then(d => {
            return d.itemsCartList
        })
    },
    changeCartItems: async (request: CartItemRequest[]): Promise<CartItemRequest[]> => {

        return api.post("/cart", request).then(data => data.data)
    },
}


export default CartServices;