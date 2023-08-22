import SessionIcon from "@assets/iconElements/SessionIcon";
import useI18n from "@hooks/useI18n";
import clsx from "clsx";
import React, { memo } from "react";
interface Props {
  isBox?: boolean;
  text: string;
  className?: string;
}
const TitleSession = memo(({ isBox = false, text, className = "" }: Props) => {
  const { t } = useI18n();
  return (
    <div className="">
      <div
        className={clsx("relative sc480:hidden block mt-3 w-full", className)}
      >
        <div className="rounded-full h-spc50 flex items-center border pl-3 border-white border-t-transparent justify-center text-lg font-bold text-white z-2 relative bg-title">
          {t(text || "")}
        </div>
        <div className="h-spc50 w-full rounded-full bg-header absolute top-[5px] left-[2px] z-1"></div>
        <div className="w-[68px] h-[68px] absolute left-spc30 bg-btn flex items-center justify-center z-10 -top-[6px] rounded-md">
          <SessionIcon />
        </div>
      </div>
      <h3
        className={clsx(
          "sc480:block hidden font-bold md:text-title text-xl leading-normal 2xl:w-1280 2xl:mx-auto text-text-main text-left",
          className
        )}
      >
        {t(text || "")}
      </h3>
    </div>
  );
});

export default TitleSession;
