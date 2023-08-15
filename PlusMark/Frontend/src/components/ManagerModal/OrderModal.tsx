import { formatMoney } from "@utility/helper";
import InputTextElement from "commons/components/InputComponent/InputTextElement";
import { OrderType } from "commons/contannt";
import React from "react";

interface Props {
  itemOrder: OrderType;
}
function OrderModal(props: Props) {
  const { itemOrder } = props;
  return (
    <div className="min-w-[550px] max-h-[80%] overflow-hidden">
      <div className="w-full h-full overflow-y-scroll hiddenScroll bg-white rounded-md pt-9 pl-16 pr-100 pb-12">
        <h3 className="font-bold text-2xl tracking-[.03] mb-12 text-center">
          Thông tin giao hàng:
          {itemOrder.id.length > 10 && <br />}
          <span className="font-normal text-main">{itemOrder.sku}</span>
        </h3>
        <div className="flex items-center justify-between gap-2 mb-[22px]">
          <p className="text-normal w-1/4">Họ và tên</p>
          <InputTextElement
            isReadOnly={true}
            value={itemOrder.customer.fullname}
            className="py-3 px-[34px] text-lg leading-6 tracking-[.03] font-normal min-w-[436px]"
          />
        </div>
        <div className="flex items-center justify-between gap-2 mb-[22px]">
          <p className="text-normal w-1/4">Số điện thoại</p>
          <InputTextElement
            value={itemOrder.customer.phoneNumber || ""}
            isReadOnly={true}
            className="py-3 px-[34px] text-lg leading-6 tracking-[.03] font-normal min-w-[436px]"
          />
        </div>
        <div className="flex items-center justify-between gap-2 mb-[22px]">
          <p className="text-normal w-1/4">Email</p>
          <InputTextElement
            value={itemOrder.customer.email || ""}
            isReadOnly={true}
            className="py-3 px-[34px] text-lg leading-6 tracking-[.03] font-normal min-w-[436px]"
          />
        </div>
        <div className="flex items-center justify-between gap-2 mb-[22px]">
          <p className="text-normal w-1/4">Địa chỉ</p>
          <InputTextElement
            value={
              itemOrder.customer.address +
                "-" +
                itemOrder.customer.commune +
                "-" +
                itemOrder.customer.district +
                "-" +
                itemOrder.customer.province || ""
            }
            isReadOnly={true}
            className="py-3 px-[34px] text-lg leading-6 tracking-[.03] font-normal min-w-[436px]"
          />
        </div>
        <div className="flex items-center justify-between gap-2 mb-8">
          <p className="text-normal w-1/4">Thanh toán</p>
          <InputTextElement
            value={itemOrder.paymentMethod}
            // value={
            //   orderPay === "card"
            //     ? "Thanh toán bằng thẻ ngân hàng"
            //     : "Thanh toán khi nhận hàng"
            // }
            isReadOnly={true}
            className="py-3 px-[34px] text-lg leading-6 tracking-[.03] font-normal min-w-[436px]"
          />
        </div>
        <p className="text-normal mb-3">Sản phẩm </p>
        <div className="w-full border-[2px] border-gray-002 rounded-md px-7 pb-2">
          {itemOrder.itemsCartList.map((item, index) => {
            return (
              <div
                key={item.itemId}
                className={
                  "flex gap-7 py-5 items-center min-w-[300px] " +
                  (!(itemOrder.itemsCartList.length === index + 1) &&
                    "border-b border-b--gray-002")
                }
              >
                <img
                  src={item.image || "/images-raw/imageTshirt.jpg"}
                  alt=""
                  className="w-[120px] h-[120px] rounded-[10px]"
                />
                <div className="w-[80%] flex flex-col justify-between h-[100px]">
                  <div className="mb-1">
                    <p className="text-left text-base tracking-[.03] leading-5 font-semibold mb-2">
                      {item.itemName}
                    </p>
                    <p className="text-base tracking-[.03] leading-5 font-semibold">
                      {item.size} /{item.color}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-base text-main tracking-[.03] leading-5 font-bold">
                      x{item.total}
                    </p>
                    <p className="text-main text-base tracking-[.03] leading-5 font-bold">
                      {formatMoney(item.price)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="px-7 mt-6 mb-7">
          <div className="border-b border-b--gray-002 ">
            <div className="flex justify-between items-center mb-3">
              <p className="font-normal text-sm tracking-[.03]">
                Giá trị sản phẩm
              </p>
              <p className="font-bold text-main text-lg leading-6 tracking-[.03]">
                {formatMoney(itemOrder.total + itemOrder.moneyVoucher)}
              </p>
            </div>

            <div className="flex justify-between items-center mb-2">
              <p className="font-normal text-sm tracking-[.03]">Giảm</p>
              <p className="font-bold text-main text-lg leading-6 tracking-[.03]">
                -{formatMoney(itemOrder.moneyVoucher)}
              </p>
            </div>
          </div>
        </div>

        <div className="px-7 flex justify-between">
          <p className="font-medium text-2xl tracking-[.03]">Tổng tiền</p>
          <p className="font-bold text-2xl tracking-[.03] text-main">
            {formatMoney(itemOrder.total)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderModal;
