
import TitleOfContent from '@components/TitleOfContent'
import { paths } from '@constants/routerPublic'
import { Banner } from '@features/contact/components/Banner'
import React from 'react'
import OrderFoodInfoForm from './components/OrderFoodInfoForm'

function OrderFoodInfo() {
  return (
    <div className='pb-16'>
      <Banner name="Thông tin đơn đặt hàng" Link={paths.orderFood.info} />
      <div className="w-rp mt-[120px] h-full">
        <TitleOfContent name="order_food_info.title" />
        <div className="mt-6">
          <OrderFoodInfoForm />
        </div>
      </div>
    </div>
  )
}

export default OrderFoodInfo