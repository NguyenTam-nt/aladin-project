
import TitleOfContent from '@components/TitleOfContent'
import { paths } from '@constants/routerPublic'
import React from 'react'
import OrderFoodInfoForm from './components/OrderFoodInfoForm'
import { HomeTopicType } from '@typeRules/home'
import { Banner } from '@components/Banner'

function OrderFoodInfo() {
  return (
    <div className='pb-16'>
      {/* <Banner name="Thông tin đơn đặt hàng" Link={paths.orderFood.info} /> */}
      <Banner type={HomeTopicType.banner_home} />
      <div className="w-rp mt-10 lg:mt-[120px] h-full">
        <TitleOfContent name="order_food_info.title" />
        <div className="mt-6">
          <OrderFoodInfoForm />
        </div>
      </div>
    </div>
  )
}

export default OrderFoodInfo