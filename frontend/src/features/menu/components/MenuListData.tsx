import { TopicMenuItem } from '@features/home/components/TopicMenu/TopicMenuItem'
import React from 'react'

export const MenuListData = () => {
  return (
    <div className='mt-[32px] grid grid-cols-2 xl:grid-cols-3 gap-[24px]'>
        {
            [1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => {
                return <TopicMenuItem key={index} />
            })
        }
    </div>
  )
}
