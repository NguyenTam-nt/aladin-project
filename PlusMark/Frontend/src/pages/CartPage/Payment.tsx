import CartProduct from "@components/Cart/CartProduct";
import { Input } from "@components/common/Input";

const PaymentPage = () => {
  return (
    <div className="py-14">
      <div className="container rounded-lg bg-white p-12 shadow">
        {[1, 2].map((it, idx) => (
          <CartProduct />
        ))}
        <div className="px-14">
          <div className="border-b-2 py-10">
            <div>
              <label>
                <p className="text-normal1 font-medium text-main py-2">
                  Họ và tên <span className="text-red-500">*</span>
                </p>
                <Input />
              </label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label>
                  <p className="text-normal1 font-medium text-main py-2">
                    Số điện thoại <span className="text-red-500">*</span>
                  </p>
                  <Input />
                </label>
              </div>
              <div>
                <label>
                  <p className="text-normal1 font-medium text-main py-2">
                    Email <span className="text-red-500">*</span>
                  </p>
                  <Input />
                </label>
              </div>
            </div>
            <div>
              <p className="text-normal1 font-medium text-main py-2">
                Địa chỉ nhận hàng
              </p>
              <div></div>
            </div>
          </div>
        </div>
        <div className="py-5 px-14">
          <div className="flex justify-between py-4">
            <h1 className="text-normal2 font-medium text-main">
              Tổng tiền tạm tính:
            </h1>
            <div className="text-normal2 font-medium text-icon">
              34.210.000Đ
            </div>
          </div>
          <button className="btn text-normal2 font-medium bg-main w-full h-16 text-center text-white my-3">
            THANH TOÁN
          </button>
          <button className="btn text-normal2 font-medium border-main border-2 w-full h-16 text-center text-main ">
            CHỌN THÊM SẢN PHẨM KHÁC
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
