import TitleOfContent from '@components/TitleOfContent'
import { paths } from '@constants/routerPublic'
import { Banner } from '@features/contact/components/Banner'
import React from 'react'

function index() {
  return (
    <div>
      <Banner name="Đặt hàng" Link={paths.orderFood.prefix} />
      <div className="w-rp mt-[120px] h-full flex gap-6">
        <div className="w-2/3">
          <TitleOfContent name="order-food.title" />
        </div>
        <div className="w-1/3">
          <TitleOfContent name="order-food.payment_title" />
        </div>
      </div>
    </div>
  )
}

export default index