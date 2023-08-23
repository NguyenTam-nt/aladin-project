import React, { useEffect, useState } from 'react'
import CartProductNew from './CartProductNew'
import useI18n from '@hooks/useI18n'
import { useCart } from '@contexts/CartContext'

function CartProductHover() {
  const {t} = useI18n()
  const {cartQuantity, totalPrice, cartItems} = useCart()
  

  return (
    <div className='px-4 py-4 bg-white shadow-md rounded-md w-[428px] max-h-[80vh] relative flex flex-col'>
      <div className="trangle arrow-up absolute bottom-full right-8 border-l-[14px] border-r-[14px] border-b-[14px] border-b-white"></div>
      <div className="absolute bottom-full w-full h-8 left-0"></div>
      <h3 className='text-normal2 font-bold text-center'>{t("header.cart.title")}</h3>
      <div className="flex-1 overflow-y-auto -mx-4 px-4">
          {
            cartItems.map((item, i) => {
                  return <CartProductNew itemCart={item} key={i} className="py-4"  change={false} border={i != 1} size="cart" payment={true}/>
              })
          }
      </div>
      <div className="flex justify-between mt-6">
          <div className="text-normal1 font-semibold">{t("header.cart.total_price")}</div>
          <div className="text-normal2 font-bold text-main">{totalPrice.toLocaleString('vi-VI') + 'đ'}</div>
      </div>

      <div className="mt-3">
          <button  className="btn uppercase  text-white bg-main text-normal1 font-semibold px-3 py-3 h-fit w-full  rounded-md flex items-center gap-1">
            {t("header.cart.buy_now")}
          </button>
      </div>
    </div>
  )
}

export default CartProductHover