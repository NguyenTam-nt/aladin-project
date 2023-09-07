import { ICCheck } from '@assets/iconElements/ICCheck';
import React, { InputHTMLAttributes, memo, useMemo } from 'react'


type Props = {
    htmlFor?: string
} & InputHTMLAttributes<HTMLInputElement>

export const Checkbox = memo(React.forwardRef(({ id, htmlFor, ...props }: Props, ref: React.LegacyRef<HTMLInputElement>) => {
    return (
        <label htmlFor={htmlFor} className="relative checkbox-custom">
            <input id={htmlFor} {...props} ref={ref} type="checkbox" hidden />
            <div className=" absolute inset-0 border-2  border-c_264 border-gray-g09 rounded-[4px]" />
            <span className="relative z-[1]">
                <ICCheck />
            </span>
        </label>
    );
}))
