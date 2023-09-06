import authSlice from "./authSlice";
import orderSlice from "./orderSlice";
import productSlice from "./productSlice";
import voucherSlice from "./voucherSlice";


export const rooteReducer = {
    auth: authSlice,
    products: productSlice,
    vouchers:voucherSlice,
    orders: orderSlice
}