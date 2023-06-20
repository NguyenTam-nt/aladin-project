import useInView from '@hooks/useInView'
import clsx from 'clsx'
import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
    title: string
    className?: string
}

export const TitleTopic = ({title, className}:Props) => {
    const {t} = useTranslation()
    const {ref, isInView} = useInView<HTMLHeadingElement>()
  return (
    <h2 ref={ref} className={clsx(`title-48 text-secondary uppercase ${className}`, {"animate__animated animate__slideInLeft ": isInView})}>{t(title)}</h2>
  )
}
