import TitleInput from '@components/TitleInput';
import { Button } from '@features/dashboard/components/Button';
import { Input } from '@features/dashboard/components/Input';
import { Textarea } from '@features/dashboard/components/Textarea';
import React from 'react'
import { useTranslation } from 'react-i18next';

type Props = {
  data: any
}

function ModalOrderFoodDetail({data}: Props) {
  const { t } = useTranslation();

  return (
    <div className="w-[1144px] h-auto bg-white py-10 px-6">
      <div className="text-center mb-10 flex justify-center items-center gap-2">
        <h2 className='text-_32 font-bold text-text_primary'>{t("adminOrderFood.detail.title") } </h2>
        <span className='text-_32 text-text_primary '>Giangmy123 </span>
        <span className='text-text_A1A0A3'>20/03/2023</span>
      </div>
      <div className="mt-10">
        <h2 className='text-_20 font-bold text-text_primary'>{t("adminOrderFood.detail.titleInfo") } </h2>
        <div className="flex gap-20">
          <div className="">
            <div className="py-2 text-text_primary">
              <span className='text-_14 font-bold mr-1'>{t("form.name")}:</span>
              <span className='text-_14'>Cuongnm</span>
            </div>
            <div className="py-2 text-text_primary">
              <span className='text-_14 font-bold mr-1'>{t("form.email")}:</span>
              <span className='text-_14'>cuongnm@aladintech.co</span>
            </div>
            <div className="py-2 text-text_primary">
              <span className='text-_14 font-bold mr-1'>{t("form.day")}:</span>
              <span className='text-_14'>20/06/2023</span>
            </div>
            <div className="py-2 text-text_primary">
              <span className='text-_14 font-bold mr-1'>{t("form.place")}:</span>
              <span className='text-_14'>Cơ sở 1, số 75, Hồ Tùng Mậu, Mai Dịch</span>
            </div>
            <div className="py-2 text-text_primary">
              <span className='text-_14 font-bold mr-1'>{t("form.note")}:</span>
              <span className='text-_14'>Bạn xếp mình vị trí thoáng nhé</span>
            </div>
          </div>
          <div className="">
            <div className="py-2 text-text_primary">
              <span className='text-_14 font-bold mr-1'>{t("form.phoneNumber")}:</span>
              <span className='text-_14'>09123456789</span>
            </div>
            <div className="py-2 text-text_primary">
              <span className='text-_14 font-bold mr-1'>{t("form.method")}:</span>
              <span className='text-_14'>Đóng gói mang về</span>
            </div>
            <div className="py-2 text-text_primary">
              <span className='text-_14 font-bold mr-1'>{t("form.hour")}:</span>
              <span className='text-_14'>10:20 AM</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className='text-_20 font-bold text-text_primary'>{t("adminOrderFood.detail.titleFood") } </h2>

        <table className='w-fit '>
          <tr className='py-4'>
            <th className='py-4 text-left pr-6'>STT</th>
            <th className='py-4 text-left pr-6'>Sản phẩm</th>
            <th className='py-4 text-left pr-6 whitespace-nowrap'>Số lượng</th>
            <th className='py-4 text-left pr-6 whitespace-nowrap'>Đơn giá (VNĐ)</th>
            <th className='py-4 text-left pr-6 whitespace-nowrap'>Tổng giá</th>
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
                <div className="flex items-center justify-start gap-4">
                  <div className="text-[13px] font-bold">
                    x1
                  </div>
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
            </tr>
            })
          }
          
            </table>
      </div>

      <div className="mt-8">
        <h2 className='text-_20 font-bold text-text_primary'>{t("adminOrderFood.detail.payment.title") } </h2>
        <div className=" grid grid-cols-2 w-fit gap-4 mt-4">
          <span className='text-_14 text-text_primary font-bold mr-1 text-left'>{t("adminOrderFood.detail.payment.total")}</span>
          <span className='text-_14 font-bold text-secondary text-right'>165.000 VNĐ</span>

          <span className='text-_14 text-text_primary font-bold mr-1 text-left'>{t("adminOrderFood.detail.payment.totalDiscount")}</span>
          <span className='text-_14 font-bold text-secondary text-right'>-25.000 VNĐ</span>

          <div className="flex ">
            <span className='text-_14 text-text_primary font-bold mr-1 text-left'>{t("adminOrderFood.detail.payment.codeDiscount")}</span>
            <span className='text-_14 text-primary font-bold uppercase'>GIANGMY123</span>
          </div>
          <span className='text-_14  text-right'>-25.000 VNĐ</span>

          <div className="flex ">
            <span className='text-_14 text-text_primary font-bold mr-1 text-left'>{t("adminOrderFood.detail.payment.codeDiscount")}</span>
            <span className='text-_14 text-primary font-bold uppercase'>GIANGMY123</span>
          </div>
          <span className='text-_14  text-right'>-25.000 VNĐ</span>
          
          <span className='text-_14 text-text_primary font-bold mr-1 text-left'>{t("adminOrderFood.detail.payment.totalOrder")}</span>
          <span className='text-_14 font-bold text-text_red text-right'>140.000 VNĐ</span>
        </div>
      </div>
    </div>
  )
}

export default ModalOrderFoodDetail