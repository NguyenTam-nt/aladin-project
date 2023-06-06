import clsx from 'clsx'
import React, { SelectHTMLAttributes, memo } from 'react'

type Props = {
   children: React.ReactElement,
} & SelectHTMLAttributes<HTMLSelectElement>

export const SelectInput = memo(({children, className, ...props}:Props) => {
  return (
    <select
        className={clsx("border w-full border-br_E9ECEF text-text_primary  text-_14 block p-2.5 " + className)}
        {...props}
      >
       {children}
      </select>
  )
})
