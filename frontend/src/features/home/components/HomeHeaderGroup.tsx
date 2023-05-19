import { Button } from "@components/Button";
import { TranslateContext } from "@contexts/Translation";
import useInView from "@hooks/useInView";
import clsx from "clsx";
import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  title: string;
  onPreClick?: () => void;
  onNextClick?: () => void;
  path?: string
  refPre?: any
  refNet?: any
};

export const HomeHeaderGroup = ({
  title,
  path,
  onNextClick,
  onPreClick,
}: Props) => {
  const { t } = useContext(TranslateContext);
  const {ref, isInView} = useInView()
  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate(path ?? "")
  }
  return (
    <div className="flex items-center relative">
      <h2 className={clsx("text-_24  m992:text-_40 font-semibold  m992:font-bold text-primary !line-clamp-1", {"animate__animated animate__fadeInLeft":isInView})}>{t(title)}</h2>
      <div className="h-[1px] flex-1 bg-br_E9ECEF mx-[12px] xl:mx-[24px]" />
      <div className="flex justify-between items-center">
        <Button
          onClick={onPreClick}
          text="<"
          color="empty"
          className={clsx("px-0 xl:px-[16px] flex justify-center w-[28px] xl:w-[42px] text-text_secondary text-_16 !h-[28px] xl:!h-[40px] border-[1px] border-solid border-br_E9ECEF hover:bg-secondary hover:text-text_white duration-300", {"animate__animated animate__fadeInUp":isInView})}
        style={{
          ["--animate-count" as string]: 1
        }}
       />
        <Button
          onClick={onNextClick}
          text=">"
          color="empty"
          className={clsx("px-0 xl:px-[16px] flex justify-center w-[28px] xl:w-[42px] text-text_secondary text-_16 !h-[28px] xl:!h-[40px] border-[1px] border-solid border-br_E9ECEF mx-[6px] xl:mx-[24px] hover:bg-secondary hover:text-text_white duration-300", {"animate__animated animate__fadeInUp":isInView})}
          style={{
            ["--animate-count" as string]: 2
          }}
        />
        <Button
          onClick={handleNavigate}
          text="+"
          color="empty"
          className={clsx("px-0 xl:px-[16px] flex justify-center w-[28px] xl:w-[42px] text-text_secondary text-_16 !h-[28px] xl:!h-[40px] border-[1px] border-solid border-br_E9ECEF hover:bg-secondary hover:text-text_white duration-300", {"animate__animated animate__fadeInUp":isInView})}
          style={{
            ["--animate-count" as string]: 3
          }}
        />
      </div>
      <div ref={ref} className=" absolute bottom-0 h-[4px] bg-transparent" />
    </div>
  );
};
