import { ArrowDownIcon } from '@assets/icons'
import { firstUpper, some } from '@utility/helper'
import clsx from 'clsx'
import React, { useEffect } from 'react'

function BrandFilter({title, selected, items, onChange}: some) {

  const handleClickItem = (item: any) => {
    if(selected.includes(item)) {
      onChange(selected.filter((s: any) => s != item))
    } else {
      onChange([...selected, item])
    }
  }


  return (
    <div className='group relative'>
      <div className="whitespace-nowrap border-gray-100 border rounded-md px-3 py-2 flex gap-2 text-wap-regular2 lg:text-normal1 text-text hover:cursor-pointer">
          {title} <ArrowDownIcon width={12} className='fill-text'/>
      </div> 
      <div className="hidden group-hover:block  z-10 absolute left-0 right-0 lg:right-auto top-[calc(100%_+_18px)] bg-white rounded-md p-4  border border-gray-100"
        style={{boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"}}  
      >
        <div className="absolute left-6 -top-2.5 w-5 h-5 rotate-45 border-t border-l "></div>
        <div className="absolute left-0 bottom-full w-full h-5  "></div>
        <div className="w-full lg:w-64 h-auto flex flex-wrap gap-3 bg-white max-h-64 overflow-y-auto"> 
          {
            items.map((item: any, i:any) => {
              return <button key={i} onClick={() => handleClickItem(item)}
                className={clsx("text-wap-regular2 lg:text-normal1 border-gray-100 border rounded-md p-2", {
                  "border-main text-main": selected.includes(item)
                })}
              >
                {item}
              </button>
            })
          }
        </div>
      </div>
    </div>
  )
}

export default BrandFilter