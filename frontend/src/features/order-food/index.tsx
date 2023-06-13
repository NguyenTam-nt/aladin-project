import { ICTicketDiscount } from '@assets/icons/ICTicketDiscount'
import TitleOfContent from '@components/TitleOfContent'
import { paths } from '@constants/routerPublic'
import { Banner } from '@features/contact/components/Banner'
import React from 'react'
import { useTranslation } from 'react-i18next'

function index() {
  const { t } = useTranslation();

  return (
    <div>
      <Banner name="Đặt hàng" Link={paths.orderFood.prefix} />
      <div className="w-rp mt-[120px] h-full flex gap-6">
        <div className="w-2/3">
          <TitleOfContent name="order_food.title" />

          <div className="mt-10">
            <table>
              <tr>
                <th>STT</th>
                <th>Sản phẩm</th>
                <th>Số lượng</th>
                <th>Đơn giá (VNĐ)</th>
                <th>Tổng giá</th>
                <th>Xóa</th>
              </tr>
              <tr>
                <td>1</td>
                <td>
                  <div className="w-10 h-10">
                    <img
                      className="w-full h-full object-cover"
                      src={"https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80"}
                      alt="iamge order food"
                    />
                  </div>
                  <span className='leading-1'>Combo 2 Người lớn ăn thả</span>
                </td>
                <td>Số lượng</td>
                <td>Đơn giá (VNĐ)</td>
                <td>Tổng giá</td>
                <td>Xóa</td>
              </tr>
            </table>
          </div>
        </div>
        <div className="w-1/3">
          <TitleOfContent name="order_food.payment_title" />

          <div className="mt-10">
            <div className="flex items-center justify-between gap-2 radius-tl-br24 border border-primary py-2.5 px-4 ">
              <div className="flex-1 flex items-center gap-2">
                <div className=" ">
                  <ICTicketDiscount />
                </div>
                <div className="">
                  <input
                    type="text"
                    className="h-[26px] w-full placeholder:text-sm outline-none !border-text_A1A0A3 text-text_primary placeholder:text-text_A1A0A3 bg-transparent"
                    placeholder={t("order_food.input_placeholder") as string}
                  />
                </div>
              </div>
              <div className="font-bold text-sm text-secondary cursor-pointer">
                {t("order_food.input_btn") as string}
              </div>
            </div>
            <div className="py-6 border-b border-b-br_CBCBCB flex items-center justify-between">
              <h4 className='text-base '>Tạm tính</h4>
              <span className='text-base font-semibold text-secondary'>165.000 VNĐ</span>
            </div>
            <div className="py-6 border-b border-b-br_CBCBCB flex items-center justify-between">
              <h4 className='text-base '>Mã giảm giá: SALEOFF35</h4>
              <span className='text-base font-semibold text-secondary'>-25.000 VNĐ</span>
            </div>
            <div className="py-6 border-b border-b-br_CBCBCB flex items-center justify-between">
              <h4 className='text-base '>Mã giảm giá: GIAMGIA55</h4>
              <span className='text-base font-semibold text-secondary'>-25.000 VNĐ</span>
            </div>
            <div className="py-6 border-b border-b-br_CBCBCB flex items-center justify-between">
              <h4 className='text-base '>Tổng cộng (Chưa có VAT)</h4>
              <span className='text-base font-semibold text-red_error'>140.000 VNĐ</span>
            </div>
            <div className="flex items-center justify-center gap-6 mt-10">
              <button className="flex-1 radius-tl-br16 w-spc167 py-3 text-center text-sm leading-5 font-bold border border-primary text-primary">
               Tiếp tục mua hàng
              </button>
              <button className="flex-1 radius-tl-br16 w-spc167 py-3 text-center text-sm leading-5 font-bold bg-primary text-white">
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default index