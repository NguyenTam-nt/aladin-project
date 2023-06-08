import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
    title: string
    className?: string
}

export const TitleTopic = ({title, className}:Props) => {
    const {t} = useTranslation()
  return (
    <h2 className={`title-48 text-secondary uppercase ${className}`}>{t(title)}</h2>
  )
}
