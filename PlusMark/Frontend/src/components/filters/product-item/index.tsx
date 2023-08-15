import { ArrowDownIcon } from '@assets/icons'
import { ProductCategoryHeader, ProductCategoryHeaderItem } from '@services/CategoryProductServices'
import { some } from '@utility/helper'
import clsx from 'clsx'
import React from 'react'

type Props = {
  title: string, 
  selected: ProductCategoryHeaderItem[], 
  items: ProductCategoryHeaderItem[],
  onChange: any
}

function ProductItemFilter({title, selected, items, onChange}: Props) {

  return (
    <div className='group relative  '>
      <div className="whitespace-nowrap border-gray-100 border rounded-md px-3 py-2 flex gap-2 text-wap-regular2 lg:text-normal1 text-text hover:cursor-pointer">
          {title} <ArrowDownIcon width={12} className='fill-text'/>
      </div> 
      <div className="hidden group-hover:block z-10 absolute left-0 top-[calc(100%_+_18px)] bg-white rounded-md pt-4 pb-2  border border-gray-100"
        style={{boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"}}  
      >
        <div className="absolute left-6 -top-2.5 w-5 h-5 rotate-45 border-t border-l "></div>
        <div className="absolute left-0 bottom-full w-full h-5  "></div>
        <div className="w-fit h-auto   bg-white"> 
          {
            items.map((item: ProductCategoryHeaderItem, i: any)=> {
              
              return <div className='group/block' key={i}>
                <div className={clsx(`peer group/item flex items-center gap-2 w-full justify-between relative mb-2 px-4 text-wap-regular2 lg:text-normal1 hover:cursor-pointer `, {
                  "text-main": selected.filter(e => e.id == item.id)?.length > 0 
                })} >
                  <span className='hover:text-main' onClick={() => onChange(item)}>{item.categoryDetailName}</span> 
                </div>
              </div>
            })
          }
        </div>
      </div>
    </div>
  )
}

export default ProductItemFilter