import { Button } from "@components/Button";
import { TranslateContext } from "@contexts/Translation";
import React, { useContext } from "react";

type Props = {
  title: string;
  onPreClick?: () => void;
  onNextClick?: () => void;
  onNavigate?: () => void;
  refPre?: any
  refNet?: any
};

export const HomeHeaderGroup = ({
  title,
  onNavigate,
  onNextClick,
  onPreClick,
}: Props) => {
  const { t } = useContext(TranslateContext);
  return (
    <div className="flex items-center">
      <span className="text-_24  xl:text-_40 font-semibold xl:font-bold text-primary">{t(title)}</span>
      <div className="h-[1px] flex-1 bg-br_E9ECEF mx-[16px] xl:mx-[24px]" />
      <div className="flex items-center">
        <Button
          onClick={onPreClick}
          text="<"
          color="empty"
          className="px-0 xl:px-[16px] flex justify-center w-[28px] xl:w-[42px] text-text_secondary text-_16 !h-[28px] xl:!h-[40px] border-[1px] border-solid border-br_E9ECEF hover:bg-secondary hover:text-text_white duration-300"
        />
        <Button
          onClick={onNextClick}
          text=">"
          color="empty"
          className="px-0 xl:px-[16px] flex justify-center w-[28px] xl:w-[42px] text-text_secondary text-_16 !h-[28px] xl:!h-[40px] border-[1px] border-solid border-br_E9ECEF mx-[16px] xl:mx-[24px] hover:bg-secondary hover:text-text_white duration-300"
        />
        <Button
          onClick={onNavigate}
          text="+"
          color="empty"
          className="px-0 xl:px-[16px] flex justify-center w-[28px] xl:w-[42px] text-text_secondary text-_16 !h-[28px] xl:!h-[40px] border-[1px] border-solid border-br_E9ECEF hover:bg-secondary hover:text-text_white duration-300"
        />
      </div>
    </div>
  );
};
