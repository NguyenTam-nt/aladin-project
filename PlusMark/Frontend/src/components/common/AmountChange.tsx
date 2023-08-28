import { some } from '@utility/helper';
import clsx from 'clsx'
import React, { useState } from 'react'

function AmountChange({quantity, ascActive, descActive, handleIncrease, handleDecrease, className}: some) {

  return (
    <div className={`${className}`} >
        <div className="flex w-fit text-black">
            <button className={clsx("px-2 ssm:px-3 py-1 leading-4 rounded-tl-[4px] rounded-bl-[4px] border border-neutra-neutra80", {"text-gray-200": !descActive})} onClick={handleDecrease}>
            -
            </button>
            <div className="py-1 px-2 ssm:px-3 border-t border-b border-neutra-neutra80 text-aqua-aq02 2lg:text-normal ssm:text-wap-regular2">{quantity}</div>
            <button className={clsx("px-2 ssm:px-3 py-1 border border-neutra-neutra80 rounded-tr-[4px] rounded-br-[4px]", {"text-gray-200": !ascActive})} onClick={handleIncrease}>
            +
            </button>
        </div>
    </div>
  )
}

export default AmountChange
