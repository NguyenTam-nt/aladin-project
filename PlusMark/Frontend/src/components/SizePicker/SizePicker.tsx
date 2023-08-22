import { ProductSize } from '@services/ProductServices'
import { some } from '@utility/helper'
import clsx from 'clsx'
import React from 'react'

type Props = {
  selected: ProductSize | undefined,
  data: ProductSize,
  handleClick: any
}

function SizePicker({ selected, data, handleClick }: Props) {

  const handleClickSize = () => {
    if (selected?.sizeName != data.sizeName && data.total > 0) {
      handleClick(data)
    }
  }

  return (
    <div className={clsx(
      "w-10 h-[30px] text-normal1 uppercase flex border border-neutra-neutra80 items-center justify-center rounded",
      {
        "text-black-bl0 line-through": data.total <= 0,
        "text-black-bl0": data.total > 0,
        "bg-aqua-aq02 text-white ": selected?.sizeName == data.sizeName,
        "bg-white": selected?.sizeName != data.sizeName,
        "hover:cursor-pointer": selected?.sizeName != data.sizeName && data.total > 0
      })
    } onClick={handleClickSize}>
      {data?.sizeName}
    </div>
  )
}

export default SizePicker