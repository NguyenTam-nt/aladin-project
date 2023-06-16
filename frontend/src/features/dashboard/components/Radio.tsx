import { ICCheck } from '@assets/icons/ICCheck'
import React, { InputHTMLAttributes, memo, useId, useMemo } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement>

export const Radio =  memo(React.forwardRef(({id, ...props}:Props, ref: React.LegacyRef<HTMLInputElement>) => {
  const idNew = useId()
  const idCheckbox = useMemo(() => {
    return id ?? idNew
  }, [id, idNew])
  
  return (
    <label htmlFor={idCheckbox} className="relative radio-custom">
        <input id={idCheckbox} {...props} ref={ref} className='!hidden' type="radio"  hidden />
        <div className=' absolute inset-0 border-2 border-text_A1A0A3 rounded-[50%]'  />
        {/* <span className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-53%] text-_20 z-[1]'>
            
        </span> */}
    </label>

  )
}))
