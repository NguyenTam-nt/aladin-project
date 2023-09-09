import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export const TextError = ({ message, option }: { message: string; option?: { [key: string]: any } }) => {
    const ref = useRef<HTMLSpanElement>(null)
    const { t } = useTranslation()
    useEffect(() => {
        if (ref.current) {
            ref.current.parentElement!.style.position = 'relative'
        }
    }, [])
    return (
        <span ref={ref} className=" text-xs left-0 text-red-r01 absolute bottom-[-16px] ">
            {t(message, {...option})}
        </span>
    )
}
