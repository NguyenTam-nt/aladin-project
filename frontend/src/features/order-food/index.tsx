import { ICDeleteTrash } from '@assets/icons/ICDeleteTrash'
import { ICTicketDiscount } from '@assets/icons/ICTicketDiscount'
import TitleOfContent from '@components/TitleOfContent'
import { paths } from '@constants/routerPublic'
import { Banner } from '@features/contact/components/Banner'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

function index() {
  const { t } = useTranslation();
  const navigate = useNavigate()

  return (
    <div>
      <Banner name="Đặt hàng" Link={paths.orderFood.prefix} />
      <div className="w-rp mt-10 lg:mt-[120px] h-full flex flex-wrap lg:flex-nowrap gap-6">
        <div className="w-full lg:w-2/3">
          <TitleOfContent name="order_food.title" />

          <div className="mt-4 lg:mt-10 hidden lg:block">
            <table className='w-full '>
              <tr className='py-4'>
                <th className='py-4 text-left pr-6'>STT</th>
                <th className='py-4 text-left pr-6'>Sản phẩm</th>
                <th className='py-4 text-left pr-6 whitespace-nowrap'>Số lượng</th>
                <th className='py-4 text-left pr-6 whitespace-nowrap'>Đơn giá (VNĐ)</th>
                <th className='py-4 text-left pr-6 whitespace-nowrap'>Tổng giá</th>
                <th className='py-4 text-left'>Xóa</th>
              </tr>
              {
                [1,2,3].map((item: any, idx: any) => {
                  return <tr className='border-t border-t-br_CBCBCB items-center' key={idx}>
                  <td className='py-4  pr-6'>{idx + 1}</td>
                  <td className='py-4  pr-6 flex items-center justify-start gap-4'>
                    <div className="w-10 h-10 flex-shrink-0">
                      <img
                        className="w-full h-full object-cover"
                        src={"https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80"}
                        alt="iamge order food"
                      />
                    </div>
                    <span className='line-clamp-1'>Combo 2 Người lớn ăn thả Combo 2 Người lớn ăn thả Combo 2 Người lớn ăn thả</span>
                  </td>
                  <td className='py-4  pr-6'>
                    <div className="flex items-center justify-center gap-4">
                      <span className='text-_18 lg:text-_24 mb-1 cursor-pointer'>
                        −
                      </span>
                      <div className="text-[13px] font-bold">
                        1
                      </div>
                      <span className='text-2xl mb-1 cursor-pointer'>
                        +
                      </span>
                    </div>
                  </td>
                  <td className='py-4  pr-6 '>
                    <div className="flex items-center justify-between gap-2">
                      <div className='text-sm text-secondary'>600.000</div>
                      <div className='text-xs text-text_A1A0A3'>/</div>
                      <div className='text-xs text-text_A1A0A3 line-through'>800.000</div>
                    </div>
                  </td>
                  <td className='py-4  pr-6'>
                    <div className='text-sm text-secondary'>600.000</div>
                  </td>
                  <td className='py-4 cursor-pointer'>
                    <div className=" flex justify-end items-center">
                      <ICDeleteTrash />
                    </div>
                  </td>
                </tr>
                })
              }
              
            </table>
          </div>

          <div className="mt-4 lg:mt-10 block lg:hidden">
            {
              [1,2,3].map((item: any, idx: any) => {
                return <div className='py-4  border-t border-t-br_CBCBCB first:border-t-0 items-center' key={idx}>
                <div className='flex items-center justify-start gap-4'>
                  <div className="w-10 h-10 flex-shrink-0">
                    <img
                      className="w-full h-full object-cover"
                      src={"https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80"}
                      alt="iamge order food"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-6">
                    <div className="">
                      <span className='line-clamp-1'>Combo 2 Người lớn ăn thả Combo 2 Người lớn ăn thả Combo 2 Người lớn ăn thả</span>
                      <div className="flex items-center gap-2">
                        <div className='text-sm text-secondary'>600.000</div>
                        <div className='text-xs text-text_A1A0A3'>/</div>
                        <div className='text-xs text-text_A1A0A3 line-through'>800.000</div>
                      </div>
                    </div>
                    <div className=" flex justify-end items-center">
                      <ICDeleteTrash />
                    </div>
                  </div>
                  
                </div>
                <div className="flex items-center justify-start gap-4">
                  <span className='text-_18 lg:text-_24 mb-1 cursor-pointer'>
                    −
                  </span>
                  <div className="text-[13px] font-bold">
                    1
                  </div>
                  <span className='text-2xl mb-1 cursor-pointer'>
                    +
                  </span>
                </div>
                
                <div className='flex justify-start items-center gap-2 py-2'>
                  <span className='text-sm text-GreyPrimary'>Tổng cộng: </span>
                  <span className='text-sm text-secondary'>600.000</span>
                </div>
              </div>
              })
            }
          </div>
        </div>
        <div className="w-full lg:w-1/3 mb-20 lg:mb-0">
          <TitleOfContent name="order_food.payment_title" />

          <div className="mt-6 lg:mt-10">
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
            <div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-6 mt-6 lg:mt-10">
              <button className="w-full lg:w-spc167 lg:flex-1 radius-tl-br16  py-3 text-center text-sm leading-5 font-bold border border-primary text-primary"
                onClick={() => navigate(paths.memu.prefix)}
              >
               Tiếp tục mua hàng
              </button>
              <button className="w-full lg:w-spc167 lg:flex-1 radius-tl-br16 py-3 text-center text-sm leading-5 font-bold bg-primary text-white"
                onClick={() => navigate(paths.orderFood.info)}
              >
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