import useI18n from "@hooks/useI18n";
import clsx from "clsx";
import React, { ReactNode, memo } from "react";
interface Props {
  icon?: ReactNode;
  iconLeft?: ReactNode;
  text: string;
  className?: string;
  onClick: () => void;
}
const LinearButton = memo(
  ({ icon, iconLeft, text, className, onClick }: Props) => {
    const { t } = useI18n();
    return (
      <div
        className={clsx(
          "min-h-[32px] min-w-[136px] p-[1px] bg-btn flex items-center justify-center",
          className
        )}
      >
        <div className="bg-white w-full h-full">
          <button
            onClick={onClick}
            className="w-full h-full text-base font-semibold flex items-center justify-center text_linear"
          >
            {iconLeft}
            {t(text || "")}
            {icon}
          </button>
        </div>
      </div>
    );
  }
);

export default LinearButton;
