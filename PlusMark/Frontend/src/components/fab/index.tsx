import React, { useEffect, useState } from 'react'

import './index.css'
import { FabCloseIcon, FabIcon } from '@assets/icons'
import clsx from 'clsx'
import SupportOnlineServices, {  SupportOnlineInfo } from '@services/SupportOnlineServices'
import FabItem from './FabItem'
import FabItemMessager from './FabItemMessager'

function FabComponent() {
 
  const [checked, setchecked] = useState(false)
  const [supportOnline, setsupportOnline] = useState<SupportOnlineInfo[]>([])
  const [supportOnlineMessager, setsupportOnlineMessager] = useState<SupportOnlineInfo[]>([])

  useEffect(() => {
    try {
      SupportOnlineServices.getDataPhone()
        .then(data => setsupportOnline(pre => [...pre, ...data]))
      SupportOnlineServices.getDataZalo()
        .then(data => setsupportOnline(pre => [...pre, ...data]))
        SupportOnlineServices.getDataFace()
        .then(data => setsupportOnlineMessager(data))
    } catch (error) {
      
    }
  }, [])
  
  //  console.log(supportOnline);
  return (<>
    <div className="fixed bottom-[10rem] right-[24px] z-[1000]">
      <input type="checkbox" checked={checked} onChange={() => setchecked(!checked)} name="fabToggle" className="fabToggle" />
      <a className="fab-animation h-11 w-11 bg-main rounded-full relative z-1 flex items-center justify-center" href="#!">
        
        <FabIcon className={clsx('fab-transition rotate-0', {
          " w-7": !checked,
          "opacity-0 w-0 rotate-90": checked
        })}/> 
        <FabCloseIcon className={clsx('fab-transition rotate-0', {
          "rotate-90 w-5": checked,
          "opacity-0 w-0": !checked
        })} />
        
      </a>
      <div className="absolute  -bottom-[120%] fab-buttons w-full">
        {
          supportOnline.slice(0, 5).map((s, i) => {
            return <FabItem key={i} data={s}/>
          })
        }
      </div>
    </div>
    {
      supportOnlineMessager.slice(0, 1).map((s, i) => {
        return <FabItemMessager key={i} data={s}/>
      })
    }
  </>
  )
}

export default FabComponent