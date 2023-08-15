import { ArrowDownIcon } from '@assets/icons'
import useViewport from '@hooks/useViewPort'
import { ProductCategoryHeader, ProductCategoryHeaderItem } from '@services/CategoryProductServices'
import { firstUpper, some } from '@utility/helper'
import clsx from 'clsx'
import React, { Fragment, useEffect, useRef, useState } from 'react'

type Props = {
  title: string, 
  selected: ProductCategoryHeader[], 
  items: ProductCategoryHeader[],
  onChange: any
}

function ProductFilter({title, selected, items, onChange}: Props) {

  const {width} = useViewport()
  const ref = useRef<any>()
  const [isLeft, setIsleft] = useState(true)

  useEffect(() => {
    // console.log(ref.current.offsetLeft, Number(width ) / 2 - 40);
    setIsleft(ref.current.offsetLeft > Number(width) / 2 - 40)
  })

  return (
    <div className='group relative  ' ref={ref}>
      <div className="cursor-pointer whitespace-nowrap border-gray-100 border rounded-md px-3 py-2 flex gap-2 text-wap-regular2 lg:text-normal1 text-text hover:cursor-pointer">
          {title} <ArrowDownIcon width={12} className='fill-text'/>
      </div> 
      <div className="hidden group-hover:block z-10 absolute left-0 top-[calc(100%_+_18px)] bg-white rounded-md pt-4 pb-2  border border-gray-100 "
        style={{boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"}}  
      >
        <div className="absolute left-6 -top-2.5 w-5 h-5 rotate-45 border-t border-l "></div>
        <div className="absolute left-0 bottom-full w-full h-5  "></div>
        {/* <div className=" absolute top-0 -right-5 bottom-full h-full w-10  bg-red-400"></div> */}
        <div className="w-fit h-auto   bg-white max-h-64 overflow-y-auto  "> 
          {
            items && items.map((item: ProductCategoryHeader, i: any)=> {
              let selectedItem = selected.filter((s:ProductCategoryHeader) => s.id == item.id)
              
              return <div className='group/block ' key={i}>
                <div className={clsx(` peer group/item flex items-center gap-2 w-full justify-between  mb-2 px-4 text-wap-regular2 lg:text-normal1 hover:cursor-default `, {
                  "text-main": selectedItem.length > 0
                })} 
                 >
                  <span className='cursor-pointer hover:text-main flex-1'
                     onClick={() => onChange(item)}
                  >{firstUpper(item.categoryName)}</span> 
                  {item.categoryNewDetails && item.categoryNewDetails.length > 0 && <ArrowDownIcon width={12} className='  -rotate-90 fill-text'/>}
                  {item.categoryNewDetails && item.categoryNewDetails.length > 0 && <div className={clsx("hidden group-hover/item:block group-hover/block:block  absolute top-1/2  w-3 h-3 -rotate-45  ", {
                    '-left-[24px] border-b border-r': isLeft,
                    '-right-[26px] border-t border-l': !isLeft,
                  })}></div>}
                  <div className="hidden group-hover/item:block group-hover/block:block  absolute top-0 -right-5 bottom-full h-full w-10  "></div>
                  
                </div>
                {item.categoryNewDetails && item.categoryNewDetails.length > 0 && 
                <div className={clsx(` overflow-y-auto overflow-x-hidden min-h-full hidden peer-hover:block group-hover/block:block absolute w-fit z-10 top-0  bg-white rounded-md p-4  border border-gray-100`, {
                  'right-[calc(100%_+_18px)]': isLeft,
                  'left-[calc(100%_+_18px)]': !isLeft,
                })}
                    style={{boxShadow: "rgba(0, 0, 0, 0.05) 0px 3px 4px"}}  
                  >
                    {
                      item.categoryNewDetails && item.categoryNewDetails.length > 0 && item.categoryNewDetails.map((i:ProductCategoryHeaderItem, idx:any) => {
                        // console.log(selectedItem.length > 0 && selectedItem[0].items.filter((s:any) => s == i).length > 0);
                        
                        return <div className={clsx("whitespace-nowrap text-wap-regular2 lg:text-normal1 py-1 hover:cursor-pointer hover:text-main ", {
                          "text-main": selectedItem.length > 0 && selectedItem[0].categoryNewDetails && selectedItem[0].categoryNewDetails.filter((s:ProductCategoryHeaderItem) => s.id == i.id).length > 0
                        })} key={idx}
                          onClick={() => onChange(item, i)}
                        >
                          {firstUpper(i.categoryDetailName)}
                        </div>
                      })
                    }
                  </div>
                }
              </div>
            })
          }
        </div>
      </div>
    </div>
  )
}

export default ProductFilter