
import { ICArowDown } from '@assets/icons/ICArowDown'
import bg_sales from "@assets/images/home/bg_sales.webp";
import type { PlaceType } from '@typeRules/place';
import clsx from 'clsx';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

const INITIAL_MAX_HEIGHT = 10000;

type Props = {
  item: PlaceType,
  idx: number
}

function AboutUsItem({item, idx}: Props) {

  const { t } = useTranslation();
  const collapseMenuRef = React.useRef<any>(null);
  const isFirstRender = React.useRef(true);
  const maxHeightRef = React.useRef(INITIAL_MAX_HEIGHT);
  const [open, setOpen] = useState(false)
  React.useEffect(() => {
    if (collapseMenuRef.current && !isFirstRender.current) {
      if (
        maxHeightRef.current > collapseMenuRef.current.offsetHeight &&
        maxHeightRef.current !== INITIAL_MAX_HEIGHT
      ) {
      // HALT!! // Someone collapsed the menu too early! // The offsetHeight is not full.
        return;
      }
      maxHeightRef.current = collapseMenuRef.current.offsetHeight;
    }
    if (open && isFirstRender.current) {
      isFirstRender.current = false;
    }
  }, [open]);

  return (
    <div className='w-rp mb-6 hover:cursor-pointer'>
      <div className="bg-white py-3 lg:py-6 px-4 pr-6 lg:pr-4 flex gap-4 justify-between items-center radius-tl-br16 lg:radius-tl-br24 "
        onClick={() => {setOpen(!open)}}
      >
        <h4 className='flex justify-center items-center h-6 lg:h-auto text-secondary text-_14 lg:text-_18 uppercase font-bold'>{t("place.place")} {idx} - {item.name}</h4>
        <div className="">
          <ICArowDown color='black' className=''  />
        </div>
      </div>
      
      <div className={clsx(" max-h-0 overflow-hidden", {
        "": open
      })}
        style={{
          maxHeight: open ? `${maxHeightRef.current}px` : '0px',
          transition: "max-height 1s ease"
        }}
        ref={collapseMenuRef}
      >
        <div className="py-6 lg:py-11">

          <h5 className='text-_14 font-semibold text-black'>{t("place.address")}: {item.address}</h5>
          <h5 className='text-_14 font-semibold text-black mt-4'>{t("place.phone")}: {item.phone}</h5>

          {
            item.infrastructureList.map(item => {
              return <div className="">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-6">
                  <img 
                    className="w-full  h-full object-cover rounded-tl-r32 rounded-br-r32"
                    src={item.linkMediaFirst}
                    alt="infrastructure"
                  />
                  <img 
                    className="w-full  h-full object-cover rounded-tl-r32 rounded-br-r32"
                    src={item.linkMediaFirst}
                    alt="infrastructure"
                  />
                  <img 
                    className="w-full  h-full object-cover rounded-tl-r32 rounded-br-r32"
                    src={item.linkMediaFirst}
                    alt="infrastructure"
                  />
                  <img 
                    className="w-full  h-full object-cover rounded-tl-r32 rounded-br-r32"
                    src={item.linkMediaFirst}
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