import { some } from '@utility/helper'
import React from 'react'

function FilteringItem({data, onRemove}: some) {
  return (
    <div className=" border border-main rounded-md px-4 py-1 flex items-center gap-2 text-wap-regular2 lg:text-normal1 text-main bg-icon " >
        <span onClick={() => onRemove(data)} className='mb-1 hover:cursor-pointer '>x</span> 
        <span className=''>{data.text}</span>
    </div> 
  )
}

export default FilteringItem