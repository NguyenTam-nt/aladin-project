import clsx from 'clsx'
import React, { SelectHTMLAttributes, memo } from 'react'

type Props = {
   children: React.ReactElement,
} & SelectHTMLAttributes<HTMLSelectElement>

export const SelectInput = memo(({children, className, ...props}:Props) => {
  return (
    <select
        className={clsx("border w-full border-br_E6E6E6 text-text_secondary focus:border-primary outline-none  text-_14 block p-2.5 " + className)}
        {...props}
      >
       {children}
      </select>
  )
})
