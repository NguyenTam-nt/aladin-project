import { some } from '@utility/helper';
import clsx from 'clsx'
import React, { useState } from 'react'

function AmountChange({quantity, ascActive, descActive, handleIncrease, handleDecrease, className}: some) {

  return (
    <div className={`${className}`} >
        <div className="flex border border-gray-200  w-fit  text-black rounded-[10px]">
            <button className={clsx("px-2 sm:px-3 py-1 text-normal2 leading-4", {"text-gray-200": !descActive})} onClick={handleDecrease}>
            -
            </button>
            <div className="py-1 px-2 sm:px-3  border border-[#00c3ab]">{quantity}</div>
            <button className={clsx("px-2 sm:px-3 py-1", {"text-gray-200": !ascActive})} onClick={handleIncrease}>
            +
            </button>
        </div>
    </div>
  )
}

export default AmountChange