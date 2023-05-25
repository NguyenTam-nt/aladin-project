import { TranslateContext } from '@contexts/Translation'
import clsx from 'clsx'
import React, { memo, useContext } from 'react'

type Props = {
    title: string
    isPaddingTop?: boolean
}

export const SubHeaderTopic = memo(({title, isPaddingTop = true}:Props) => {
    const {t} = useContext(TranslateContext)
  return (
    <h3 className={clsx('text-_24 font-semibold text-text_primary mb-[24px] flex-1', {"mt-[32px]": isPaddingTop})}>{t(title)}</h3>
  )
})
