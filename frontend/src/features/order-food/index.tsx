import { ICDeleteTrash } from '@assets/icons/ICDeleteTrash'
import { ICDeleteVoucher } from '@assets/icons/ICDeleteVoucher'
import { ICTicketDiscount } from '@assets/icons/ICTicketDiscount'
import { formatNumberDot, formatNumberDotWithVND } from '@commons/formatMoney'
import { Banner } from '@components/Banner'
import TitleOfContent from '@components/TitleOfContent'
import { paths } from '@constants/routerPublic'
import { useCartContext } from '@contexts/hooks/order'
// import { Banner } from '@features/contact/components/Banner'
import { TextError } from '@features/dashboard/components/TextError'
import VoucherService from '@services/VoucherService'
import { HomeTopicType } from '@typeRules/home'
import type { IProduct } from '@typeRules/product'
import type { VoucherCheckPriceDTO } from '@typeRules/voucher'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

function index() {
  const { t } = useTranslation();
  const navigate = useNavigate()

  const  { listOrder, handleDeleteCart, handleMinusCart, handlePlusCart } = useCartContext()
  const [voucher, setVoucher] = useState("")
  const [validVoucher, setValidVoucher] = useState<VoucherCheckPriceDTO>()
  const [isValidVoucher, setIsValidVoucher] = useState(true)

  const totalPrice = useMemo(() => {
    return listOrder.reduce((currentValue, data) => {
      return (
        currentValue +
        Number(data?.pricePromotion ?? 0) * Number(data.quantity ?? 0)
      );
    }, 0);
  }, [listOrder]);

  useEffect(() => {
    setValidVoucher(undefined)
    setVoucher("")
    setIsValidVoucher(true)
  }, [totalPrice])


  const checkVoucher = () => {

    let request: VoucherCheckPriceDTO = {
      code: voucher,
      price: totalPrice
    }

    VoucherService
      .checkPrice(request)
      .then((res) => {
        setValidVoucher(res)
        setIsValidVoucher(true)
      })
      .catch((error) => {
        console.log(error);
        setIsValidVoucher(false)
        
      });
  }

  const handleClickPayment = () => {
    if(listOrder && listOrder.length > 0) {
      navigate(paths.orderFood.info, {
        state: {
          voucher: validVoucher
        }
      })
    }
  }

  return (
    <div>
      {/* <Banner name="Đặt hàng" Link={paths.orderFood.prefix} /> */}
      <Banner type={HomeTopicType.banner_home} />
      <div className="w-rp mt-10 lg:mt-[120px] h-full flex flex-wrap lg:flex-nowrap gap-6">
        <div className="w-full lg:w-2/3">
          <TitleOfContent name="order_food.title" />

          <div className="mt-4 lg:mt-10 hidden lg:block">
            <table className='w-full '>
              <tr className='py-4'>
                <th className='py-4 text-left pr-6'>{t("order_food.table.stt")}</th>
                <th className='py-4 text-left pr-6'>{t("order_food.table.product")}</th>
                <th className='py-4 text-left pr-6 whitespace-nowrap'>{t("order_food.table.amount")}</th>
                <th className='py-4 text-left pr-6 whitespace-nowrap'>{t("order_food.table.unit")}</th>
                <th className='py-4 text-left pr-6 whitespace-nowrap'>{t("order_food.table.total")}</th>
                <th className='py-4 text-right'>{t("order_food.table.delete")}</th>
              </tr>
              {
                listOrder.map((item: IProduct, idx: any) => {
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
                    <span className='line-clamp-1 text-sm'>{item.name}</span>
                  </td>
                  <td className='py-4  pr-6'>
                    <div className="flex items-center justify-center gap-4">
                      <span className='text-_18 lg:text-_24 mb-1 cursor-pointer'
                        onClick={() => item.id && handleMinusCart(item.id, 1)}
                      >
                        −
                      </span>
                      <div className="text-[13px] font-bold">
                        {item.quantity}
                      </div>
                      <span className='text-2xl mb-1 cursor-pointer'
                        onClick={() => handlePlusCart(item, 1)}
                      >
                        +
                      </span>
                    </div>
                  </td>
                  <td className='py-4  pr-6 '>
                    <div className="flex items-center justify-start gap-2">
                      <div className='text-sm text-secondary'>{formatNumberDot(item.pricePromotion)}</div>
                      <div className='text-xs text-text_A1A0A3'>/</div>
                      <div className='text-xs text-text_A1A0A3 line-through'>{formatNumberDot(item.price)}</div>
                    </div>
                  </td>
                  <td className='py-4  pr-6'>
                    <div className='text-sm text-secondary'>{formatNumberDot(Number(item.pricePromotion) * Number(item.quantity))}</div>
                  </td>
                  <td className='py-4 cursor-pointer'>
                    <div className=" flex justify-end items-center"
                      onClick={() => item.id && handleDeleteCart(item.id)}
                    >
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
              listOrder.map((item: IProduct, idx: any) => {
                return <div className='py-4  border-t border-t-br_CBCBCB first:border-t-0 items-center' key={item.id}>
                <div className='flex items-center justify-start gap-4'>
                  <div className="w-10 h-10 flex-shrink-0">
                    <img
                      className="w-full h-full object-cover"
                      src={item.linkMedia}
                      alt="iamge order food"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-6 w-full">
                    <div className="flex-1">
                      <span className='line-clamp-1 text-sm'>{item.name}</span>
                      <div className="flex items-center justify-start gap-2">
                        <div className='text-sm text-secondary'>{formatNumberDot(item.pricePromotion)}</div>
                        <div className='text-xs text-text_A1A0A3'>/</div>
                        <div className='text-xs text-text_A1A0A3 line-through'>{formatNumberDot(item.price)}</div>
                      </div>
                    </div>
                    <div className=" flex justify-end items-center"
                      onClick={() => item.id && handleDeleteCart(item.id)}
                    >
                      <ICDeleteTrash />
                    </div>
                  </div>
                  
                </div>
                <div className="flex items-center justify-start gap-4">
                  <span className='text-_18 lg:text-_24 mb-1 cursor-pointer'
                    onClick={() => item.id && handleMinusCart(item.id, 1)}
                  >
                    −
                  </span>
                  <div className="text-[13px] font-bold">
                    {item.quantity}
                  </div>
                  <span className='text-2xl mb-1 cursor-pointer'
                    onClick={() => handlePlusCart(item, 1)}
                  >
                    +
                  </span>
                </div>
                
                <div className='flex justify-start items-center gap-2 py-2'>
                  <span className='text-sm text-GreyPrimary'>{t("order_food.calc.total")}: </span>
                  <span className='text-sm text-secondary'>{formatNumberDot(Number(item.pricePromotion) * Number(item.quantity))}</span>
                </div>
              </div>
              })
            }
          </div>
        </div>
        <div className="w-full lg:w-1/3 mb-20 lg:mb-0">
          <TitleOfContent name="order_food.payment_title" />

          <div className="mt-6 lg:mt-10">
            <div className="">
              <div className="flex items-center justify-between gap-2 radius-tl-br24 border border-primary py-2.5 px-4 ">
                <div className="flex-1 flex items-center gap-2">
                  <div className=" ">
                    <ICTicketDiscount />
                  </div>
                  <div className="">
                    <input
                      type="text" value={voucher} onChange={e => setVoucher(e.target.value)}
                      className="h-[26px] w-full placeholder:text-sm outline-none !border-text_A1A0A3 text-text_primary placeholder:text-text_A1A0A3 bg-transparent"
                      placeholder={t("order_food.input_placeholder") as string}
                    />
                  </div>
                </div>
                <div className="font-bold text-sm text-secondary cursor-pointer select-none"
                  onClick={checkVoucher}
                >
                  {t("order_food.input_btn") as string}
                </div>
              </div>
              {!isValidVoucher && <TextError message='order_food.voucher-error'/> }
            </div>
            <div className="py-6 border-b border-b-br_CBCBCB flex items-center justify-between">
              <h4 className='text-base '>{t("order_food.calc.sub_total")}</h4>
              <span className='text-base font-semibold text-secondary'>{formatNumberDotWithVND(totalPrice)}</span>
            </div>
            {
              validVoucher && 
              <div className="py-6 border-b border-b-br_CBCBCB flex items-center justify-between">
                <div className="flex items-center cursor-pointer"
                  onClick={() => setValidVoucher(undefined)}
                >
                  <ICDeleteVoucher />
                  <h4 className='text-base ml-3'>{t("order_food.voucher")}: {validVoucher.code}</h4>  
                </div>
                <span className='text-base font-semibold text-secondary'>{formatNumberDotWithVND(0 - validVoucher.price)}</span>
              </div>
            }
            <div className="py-6 border-b border-b-br_CBCBCB flex items-center justify-between">
              <h4 className='text-base '>{t("order_food.total")}</h4>
              <span className='text-base font-semibold text-red_error'>
                {formatNumberDotWithVND((totalPrice - (validVoucher ? validVoucher.price  : 0)) < 0 ? 0 : (totalPrice - (validVoucher ? validVoucher.price  : 0))) }
                </span>
            </div>
            <div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-6 mt-6 lg:mt-10">
              <button className="w-full lg:w-spc167 lg:flex-1 radius-tl-br16  py-3 text-center text-sm leading-5 font-bold border border-primary text-primary"
                onClick={() => navigate(paths.memu.prefix)}
              >
                {t("order_food.continue_choose")}
              </button>
              <button className="w-full lg:w-spc167 lg:flex-1 radius-tl-br16 py-3 text-center text-sm leading-5 font-bold bg-primary text-white"
                onClick={() => handleClickPayment()}
              >
                 {t("order_food.payment_title")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default index