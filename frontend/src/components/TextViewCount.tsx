import { ICEye } from "@assets/icons/ICEye";
import { Colors } from "@constants/color";
import { TranslateContext } from "@contexts/Translation";
import clsx from "clsx";
import React, { useContext } from "react";

export const TextViewCount = ({viewCount, className, colorEye}:{viewCount: number, className?: string, colorEye?: string}) => {
    const {t} = useContext(TranslateContext)
  return (
    <div className="flex items-center">
      <ICEye color={colorEye ?? Colors.text_7E8B99} />{" "}
      <span className={clsx("text-text_7E8B99 text-_16 ml-2", className)}>
        {viewCount} {t("button.view_count")}
      </span>
    </div>
  );
};
