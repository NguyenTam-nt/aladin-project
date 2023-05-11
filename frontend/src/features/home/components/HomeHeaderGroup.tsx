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
      <span className="text-_40 font-bold text-primary">{t(title)}</span>
      <div className="h-[1px] flex-1 bg-br_E9ECEF mx-[24px]" />
      <div className="flex items-center">
        <Button
          onClick={onPreClick}
          text="<"
          color="empty"
          className="w-[42px] text-text_secondary text-_16 h-[40px] border-[1px] border-solid border-br_E9ECEF"
        />
        <Button
          onClick={onNextClick}
          text=">"
          color="empty"
          className="w-[42px] text-text_secondary text-_16 h-[40px] border-[1px] border-solid border-br_E9ECEF mx-[24px]"
        />
        <Button
          onClick={onNavigate}
          text="+"
          color="empty"
          className="w-[42px] text-text_secondary text-_16 h-[40px] border-[1px] border-solid border-br_E9ECEF"
        />
      </div>
    </div>
  );
};
