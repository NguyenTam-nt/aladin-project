import { LogoSupershopIcon, RadioSuccessIcon } from '@assets/icons'
import useI18n from '@hooks/useI18n'
import FooterServices from '@services/FooterService'
import React, {useState, useEffect} from 'react'

function SendContactModal() {

  const {t} = useI18n()
  const [phone, setPhone] = useState<string>()

  useEffect(() => {
    try {
      FooterServices.get()
        .then(data => {
          setPhone(data.phoneNumber[0])
          
        })
    } catch (error) {
      
    }
  }, [])

  return (
    <div className='flex max-w-[90%] flex-col justify-center items-center bg-white rounded-lg shadow-md py-7'>
        <RadioSuccessIcon className=''/>
        <p className='text-normal2 lg:text-title text-center font-bold text-[#00880C] px-4 lg:px-16 my-2 lg:my-4'>{t("about_us.contact.message.success_modal.title")}</p>
        <p className='text-wap-regular2 lg:text-normal text-center font-medium  px-4 lg:px-16 flex items-center'>{t("about_us.contact.message.success_modal.thank")} <LogoSupershopIcon /></p>
        <p className='text-wap-regular2 lg:text-normal text-center font-medium  flex items-center justify-center px-4  w-full  flex-wrap lg:block '>{t("about_us.contact.message.success_modal.feedback")} 
          <span className='text-normal font-medium text-main ml-2'>{phone || "1800.3675"}</span>
        </p>
    </div>
  )
}

export default SendContactModal 