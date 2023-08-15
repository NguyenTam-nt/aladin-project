import { AtmMethodIcon, PersonMethodIcon, TickIcon } from '@assets/icons';
import { some } from '@utility/helper';
import React, { useState } from 'react'

function ShipmentMethod({method, checked, setChecked, ...props}: some) {


  return (
    <div className='flex items-center gap-5 border border-gray-200 rounded-md px-4 py-4 '>
        <div className="w-6 ">
            <label >
                <input
                className="hidden"
                type="radio"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                />
                <div
                className={`hover:cursor-pointer w-6 aspect-square p-1 border-2   flex items-center justify-center rounded-full ${
                    checked ? " border-[#00880C] bg-[#E9FFEA]" : ""
                }`}
                >
                {checked && <TickIcon stroke='#00880C'  />}
                </div>
            </label>
        </div>
        <div className="mr-4">
            { method == 'person' ? <PersonMethodIcon  /> : <AtmMethodIcon />}
        </div>
        <div className="text-normal1">
            { method == 'person' ? 'Thanh toán khi giao hàng (COD)' : 'Thanh toán bằng thẻ ATM / chuyển khoản'} 
        </div>
    </div>
  )
}

export default ShipmentMethod