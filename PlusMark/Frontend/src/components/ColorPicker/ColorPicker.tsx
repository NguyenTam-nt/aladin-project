import { CircleFilledIcon } from '@assets/icons'
import { ProductColor } from '@services/ProductServices'
import { some } from '@utility/helper'
import React from 'react'

type Props = {
  hiddenText?: any, 
  selected: ProductColor | undefined, 
  data: ProductColor, 
  handleClick: any
}

function ColorPicker({hiddenText, selected, data, handleClick}: Props) {
  return (
    <div className="flex flex-col items-center justify-center hover:cursor-pointer" onClick={() => handleClick(data)}>
      <div
          className={`${
            selected?.colorName == data.colorName ? "w-fit p-[2px] border border-background-100 rounded-full" : !hiddenText ? "mb-[26px]" : ""
          }`}
      >
          <CircleFilledIcon
            className={`${data.colorCode == data.colorCode  ? "w-7" : "w-7"} fill-[${data.colorCode}] border border-background-100 rounded-full`}
            fill={data.colorCode}
          />
          {/* <img src={data.image} className='w-7 h-7 object-cover border border-background-100 rounded-full' alt="image color" /> */}
      </div>
      {!hiddenText && selected?.colorName == data.colorName  ? <span className="text-normal h-[22px] mt-1">{data.colorName}</span> : ""}
    </div>
  )
}

export default ColorPicker