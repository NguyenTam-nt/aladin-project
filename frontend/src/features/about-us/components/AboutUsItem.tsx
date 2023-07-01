
import { ICArowDown } from '@assets/icons/ICArowDown'
import bg_sales from "@assets/images/home/bg_sales.webp";
import type { PlaceType } from '@typeRules/place';
import clsx from 'clsx';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';

type Props = {
  item: PlaceType,
  idx: number
}

function AboutUsItem({item, idx}: Props) {

  const { t } = useTranslation();
  const collapseMenuRef = React.useRef<any>(null);
  const [maxHeight, setMaxHeight] = useState()
  const [open, setOpen] = useState(false)

  useLayoutEffect(() => {
    setOpen(false)
    if(collapseMenuRef && collapseMenuRef.current && maxHeight == undefined) {
      setMaxHeight(collapseMenuRef.current.clientHeight)
    }
    
  }, [collapseMenuRef, collapseMenuRef.current])

  console.log(maxHeight);


  return (
    <div className='w-rp mb-6 hover:cursor-pointer'>
      <div className="bg-white py-3 lg:py-6 px-4 pr-6 lg:pr-4 flex gap-4 justify-between items-center radius-tl-br16 lg:radius-tl-br24 "
        onClick={() => {setOpen(!open)}}
      >
        <h4 className=' lg:h-6 h-auto leading-[22px] lg:leading-8 text-secondary text-_14 lg:text-_18 uppercase font-bold line-clamp-2 lg:line-clamp-1'>
          {item.name} - {item.address}
        </h4>
        <div className="">
          <ICArowDown color='black' className={`transition duration-300 ${open && "rotate-180 "}`}  />
        </div>
      </div>
      
      <div className={clsx("overflow-hidden", {})}
        style={{
          maxHeight: open ? maxHeight + "px" : collapseMenuRef && collapseMenuRef.current ? "0" : "",
          transition: "max-height 1s ease"
        }}
        ref={collapseMenuRef}
      >
        <div className="py-6 lg:py-11">

          <h5 className='text-_14 font-semibold text-black'>{t("place.address")}: {item.address}</h5>
          <h5 className='text-_14 font-semibold text-black mt-4'>{t("place.phone")}: {item.phone}</h5>

          {
            item.infrastructureList.map(item => {
              return <div className="" key={item.id}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-6">
                  <img 
                    className="w-full  h-[392px] object-cover rounded-tl-r32 rounded-br-r32"
                    src={item.linkMediaFirst}
                    alt="infrastructure"
                  />
                  <img 
                    className="w-full  h-[392px] object-cover rounded-tl-r32 rounded-br-r32"
                    src={item.linkMediaSecond}
                    alt="infrastructure"
                  />
                  <img 
                    className="w-full  h-[392px] object-cover rounded-tl-r32 rounded-br-r32"
                    src={item.linkMediaThird}
                    alt="infrastructure"
                  />
                  <img 
                    className="w-full  h-[392px] object-cover rounded-tl-r32 rounded-br-r32"
                    src={item.linkMediaFour}
                    alt="infrastructure"
                  />

                </div>

                <p className="text-_14 text-black pb-4">
                  {item.description}            
                </p>
              </div>
            })
          }
        </div>

      </div>
    </div>
  )
}

export default AboutUsItem