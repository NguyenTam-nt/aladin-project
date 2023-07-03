import { ICClear } from '@assets/icons/ICClear';
import { formatNumberDot, formatNumberDotSlice, formatNumberDotWithVND } from '@commons/formatMoney';
import TitleInput from '@components/TitleInput';
import { FomatDateDDMMYY, FomatDateYY_MM_DD } from '@constants/formatDateY_M_D';
import { fornatDateHour } from '@constants/fornatDateHour';
import { useModalContext } from '@contexts/hooks/modal';
import { Button } from '@features/dashboard/components/Button';
import { Input } from '@features/dashboard/components/Input';
import { Textarea } from '@features/dashboard/components/Textarea';
import BillService from '@services/BillService';
import { BillTypeContants, IBillProduct, type IBill, type IBillDetail } from '@typeRules/bill';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';

type Props = {
  idBill: number
}

function ModalOrderFoodDetail({idBill}: Props) {
  const { t } = useTranslation();
  const { hideModal } = useModalContext();
  const [bill, setBill] = useState<IBillDetail>()

  useEffect(() => {
    BillService.getById(idBill)
    .then(res => {
      setBill(res)
    })
  }, [idBill])
  console.log(bill);
  

  return (
    <div className="w-[1144px] h-auto bg-white py-10 px-6">
      <button onClick={hideModal} className="text-text_7E8B99 absolute top-[24px] text-_16 right-[24px]">
       <ICClear />
      </button>
      <div className="text-center mb-10 flex justify-center items-center gap-2">
        <h2 className='text-_32 font-bold text-text_primary'>{t("adminOrderFood.detail.title") } </h2>
        <span className='text-_32 text-text_primary '>{bill && bill.id} </span>
        <span className='text-text_A1A0A3 italic'>{bill && FomatDateDDMMYY(bill.createdDate)}</span>
      </div>
      <div className="mt-10">
        <h2 className='text-_20 font-bold text-text_primary'>{t("adminOrderFood.detail.titleInfo") } </h2>
        <div className="flex gap-20">
          <div className="">
            <div className="py-2 text-text_primary">
              <span className='text-_14 font-bold mr-1'>{t("form.name")}:</span>
              <span className='text-_14'>{bill && bill.fullname}</span>
            </div>
            <div className="py-2 text-text_primary">
              <span className='text-_14 font-bold mr-1'>{t("form.email")}:</span>
              <span className='text-_14'>{bill && bill.email}</span>
            </div>
            <div className="py-2 text-text_primary">
              <span className='text-_14 font-bold mr-1'>{t("form.day")}:</span>
              <span className='text-_14'>{bill && FomatDateDDMMYY(bill.chooseDate)}</span>
            </div>
            <div className="py-2 text-text_primary">
              <span className='text-_14 font-bold mr-1'>{t("form.place")}:</span>
              <span className='text-_14'>{bill && bill?.infrastructure}</span>
            </div>
            <div className="py-2 text-text_primary">
              <span className='text-_14 font-bold mr-1'>{t("form.note")}:</span>
              <span className='text-_14'>{bill && bill?.note}</span>
            </div>
          </div>
          <div className="">
            <div className="py-2 text-text_primary">
              <span className='text-_14 font-bold mr-1'>{t("form.phoneNumber")}:</span>
              <span className='text-_14'>{bill && bill?.phone}</span>
            </div>
            <div className="py-2 text-text_primary">
              <span className='text-_14 font-bold mr-1'>{t("form.method")}:</span>
              <span className='text-_14'>
                {
                  bill && BillTypeContants.pack == bill.type ? t("form.method2")  : t("form.method1")
                }
              </span>
            </div>
            <div className="py-2 text-text_primary">
              <span className='text-_14 font-bold mr-1'>{t("form.hour")}:</span>
              <span className='text-_14'>{bill && fornatDateHour(bill.chooseDate)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className='text-_20 font-bold text-text_primary'>{t("adminOrderFood.detail.titleFood") } </h2>

        <table className='w-fit '>
          <tr className='py-4'>
            <th className='py-4 text-left pr-6'>{t("order_food.table.stt")}</th>
            <th className='py-4 text-left pr-6'>{t("order_food.table.product")}</th>
            <th className='py-4 text-left pr-6 whitespace-nowrap'>{t("order_food.table.amount")}</th>
            <th className='py-4 text-left pr-6 whitespace-nowrap'>{t("order_food.table.unit")}</th>
            <th className='py-4 text-left pr-6 whitespace-nowrap'>{t("order_food.table.total")}</th>
          </tr>
          {
            bill && bill.listProduct.map((item: IBillProduct, idx: any) => {
              return <tr className='border-t border-t-br_CBCBCB items-center' key={item.id}>
              <td className='py-4  pr-6'>{idx + 1}</td>
              <td className='py-4  pr-6 flex items-center justify-start gap-4'>
                <div className="w-10 h-10 flex-shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    src={item.linkMedia}
                    alt="iamge order food"
                  />
                </div>
                <span className='line-clamp-1'>{item.name}</span>
              </td>
              <td className='py-4  pr-6'>
                <div className="flex items-center justify-start gap-4">
                  <div className="text-[13px] font-bold">
                    x{item.num}
                  </div>
                </div>
              </td>
              <td className='py-4  pr-6 '>
                <div className="flex items-center justify-start gap-2">
                  <div className='text-sm text-secondary'>{formatNumberDotSlice(item.pricePromotion)}</div>
                  <div className='text-xs text-text_A1A0A3'>/</div>
                  <div className='text-xs text-text_A1A0A3 line-through'>{formatNumberDotSlice(item.price)}</div>
                </div>
              </td>
              <td className='py-4  pr-6'>
                <div className='text-sm text-secondary'>{formatNumberDotSlice(item.pricePromotion * item.num)}</div>
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
          <span className='text-_14 font-bold text-secondary text-right'>{formatNumberDotSlice(bill?.price || 0) + " VNĐ"}</span>

          <span className='text-_14 text-text_primary font-bold mr-1 text-left'>{t("adminOrderFood.detail.payment.totalDiscount")}</span>
          <span className='text-_14 font-bold text-secondary text-right'>{bill && formatNumberDotSlice(bill?.discount) + " VNĐ"}</span>

          {bill && bill.voucher && <>
              <div className="flex ">
                <span className='text-_14 text-text_primary font-bold mr-1 text-left'>{t("adminOrderFood.detail.payment.codeDiscount")}</span>
                <span className='text-_14 text-primary font-bold '>{bill && bill.voucher.code}</span>
              </div>
              <span className='text-_14  text-right'>{bill && formatNumberDotSlice(0 - bill.voucher.price) + " VNĐ"}</span>
            </>
          }
          
          <span className='text-_14 text-text_primary font-bold mr-1 text-left'>{t("adminOrderFood.detail.payment.totalOrder")}</span>
          <span className='text-_14 font-bold text-text_red text-right'>{bill&& formatNumberDotSlice(bill.priceAll) + " VNĐ"}</span>
        </div>
      </div>
    </div>
  )
}

export default ModalOrderFoodDetail