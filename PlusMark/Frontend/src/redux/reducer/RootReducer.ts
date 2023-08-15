import authSlice from "./authSlice";
import categorySlice from "./categorySlice";
import orderSlice from "./orderSlice";
import productSlice from "./productSlice";
import voucherSlice from "./voucherSlice";


export const rooteReducer = {
    auth: authSlice,
    categories: categorySlice,
    products: productSlice,
    vouchers:voucherSlice,
    orders: orderSlice
}