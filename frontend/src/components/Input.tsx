import { TranslateContext } from "@contexts/Translation";
import React, { useContext, InputHTMLAttributes } from "react";
type Props = {
    withIndicator?: boolean
    IconComponent?: React.ReactNode
} & InputHTMLAttributes<HTMLInputElement>


export const Input = ({withIndicator, IconComponent, placeholder, ...props}:Props) => {
    const {t} = useContext(TranslateContext)
  return (
    <div className="h-[40px] flex items-center py-[8px] px-[16px] border-[1px] border-solid border-br_E9ECEF focus-within:border-primary">
      <input
        {...props}
        className="flex-1 h-full outline-none bg-transparent"
        placeholder={t(placeholder)}
      />
    </div>
  );
};
