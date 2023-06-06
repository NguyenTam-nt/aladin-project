import { TranslateContext } from "@contexts/Translation";
import clsx from "clsx";
import React, { useContext, InputHTMLAttributes, memo } from "react";
type Props = {
  withIndicator?: boolean;
  IconComponent?: React.ReactNode;
  renderRight?: () => React.ReactElement;
  renderLeft?: () => React.ReactElement;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = memo(React.forwardRef(
  (
    {
      withIndicator,
      IconComponent,
      placeholder,
      renderRight,
      renderLeft,
      className,
      ...props
    }: Props,
    ref: React.LegacyRef<HTMLInputElement>
  ) => {
  
    
    const { t } = useContext(TranslateContext);
    return (
      <div
        className={clsx(
          (className =
            "h-[40px] flex items-center py-[8px] px-[16px] border-[1px] border-solid border-br_E9ECEF focus-within:border-secondary " +
            className)
        )}
      >
        {renderLeft ? renderLeft?.() : null}
        <input
          ref={ref}
          autoComplete="off"
          {...props}
          className="flex-1 h-full outline-none bg-transparent"
          placeholder={t(placeholder)}
        />
        {renderRight ? renderRight?.() : null}
      </div>
    );
  }
))
