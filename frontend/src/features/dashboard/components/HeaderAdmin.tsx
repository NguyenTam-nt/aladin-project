import { TranslateContext } from '@contexts/Translation'
import React, { useContext } from 'react'

type Props = {
  title: string
}

export const HeaderAdmin = ({title}: Props) => {
    const {t} = useContext(TranslateContext)
  return (
    <div className="mb-[15px] lg:mb-[50px]">
      <h2
        className=" text-_40 text-text_primary  uppercase font-bold">
        {t(title)}
      </h2>
    </div>
  )
}
