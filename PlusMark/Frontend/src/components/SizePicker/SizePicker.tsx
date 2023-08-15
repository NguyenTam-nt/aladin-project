import { ProductSize } from '@services/ProductServices'
import { some } from '@utility/helper'
import clsx from 'clsx'
import React from 'react'

type Props = {
  selected: ProductSize | undefined, 
  data: ProductSize, 
  handleClick: any
}

function SizePicker({selected, data, handleClick}: Props) {

  const handleClickSize = () => {
    if(selected?.sizeName != data.sizeName && data.total > 0) {
      handleClick(data)
    }
  }

  return (
    <div className={clsx(
        "px-3 py-2 text-normal1 uppercase flex-1 max-w-fit border-l-[1px] last:border-r-[1px]", 
        {
          "text-background-100 line-through": data.total <= 0,
          "text-black": data.total > 0,
          "bg-black text-white ": selected?.sizeName == data.sizeName,
          "bg-white": selected?.sizeName != data.sizeName,
          "hover:cursor-pointer": selected?.sizeName != data.sizeName && data.total > 0
        })
    } onClick={handleClickSize}>
      {data?.sizeName}
    </div>
  )
}

export default SizePicker