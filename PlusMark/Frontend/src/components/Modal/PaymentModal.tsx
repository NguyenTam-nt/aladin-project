import { LogoSupershopIcon, RadioSuccessIcon } from '@assets/icons'
import useI18n from '@hooks/useI18n'
import FooterServices from '@services/FooterService'
import React, {useState, useEffect} from 'react'

function PaymentModal() {

  const {t} = useI18n()

  // const [phone, setPhone] = useState<string>()

  // useEffect(() => {
  //   try {
  //     FooterServices.get()
  //       .then(data => {
  //         setPhone(data.phoneNumber[0])
          
  //       })
  //   } catch (error) {
      
  //   }
  // }, [])

  return (
    <div className='flex max-w-[90%] flex-col justify-center items-center bg-white rounded-lg shadow-md py-7'>
        <RadioSuccessIcon className=''/>
        <p className='text-center text-normal2 lg:text-title font-bold text-text px-4 lg:px-16 my-2 lg:my-4'>{t("payment.success_modal.title")}</p>
        <p className=' text-wap-regular2 lg:text-normal font-medium  px-4 lg:px-16 flex items-center'>{t("payment.success_modal.thank")} <span className="font-bold text-main pl-1">Market Moa</span></p>
        <p className='text-center text-wap-regular2 lg:text-normal font-medium  px-4 lg:px-16 mb-4 lg:mb-6'>{t("payment.success_modal.confirm")}</p>
        <p className='text-center text-wap-regular2 lg:text-normal font-medium  pt-4 lg:pt-5 border-t-2 border-background-100  px-4 lg:px-12 w-full flex flex-wrap lg:block justify-center'>{t("payment.success_modal.feedback")} 
          <span className='text-center text-normal font-medium text-main ml-2'>{"phone" || "1800.3675"}</span>
        </p>
    </div>
  )
}

export default PaymentModal