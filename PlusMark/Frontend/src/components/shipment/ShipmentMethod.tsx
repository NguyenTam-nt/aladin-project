import { AtmMethodIcon, CircleFilledIcon, PersonMethodIcon, TickIcon } from '@assets/icons';
import { some } from '@utility/helper';
import React, { useState } from 'react'

function ShipmentMethod({method, checked, setChecked, ...props}: some) {


  return (
    <div className='flex justify-between items-center gap-5 border border-gray-200 rounded-lg px-4 py-2 '>
        <div className="text-normal1">
            { method == 'person' ? 'Thanh toán khi giao hàng (COD)' : 'Thanh toán qua VISA / MASTERCARD'} 
        </div>
        <div className="w-6">
            <label >
                <input
                className="hidden"
                type="radio"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                />
                <div
                className={`hover:cursor-pointer w-6 aspect-square p-1 border-2   flex items-center justify-center rounded-full ${
                    checked ? " border-main" : ""
                }`}
                >
                {checked && <CircleFilledIcon className='fill-main' />}
                </div>
            </label>
        </div>
    </div>
  )
}

export default ShipmentMethod