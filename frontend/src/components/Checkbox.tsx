import { ICCheck } from '@assets/icons/ICCheck'
import React, { InputHTMLAttributes, memo } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement>

export const Checkbox =  memo(React.forwardRef(({id, ...props}:Props, ref: React.LegacyRef<HTMLInputElement>) => {

  return (
    <label htmlFor={id} className="relative checkbox-custom">
        <input id={id} {...props} ref={ref} type="checkbox"  hidden />
        <div className=' absolute inset-0 border-2 border-text_primary rounded-sm'  />
        <span className='relative z-[1]'>
            <ICCheck />
        </span>
    </label>

  )
}))