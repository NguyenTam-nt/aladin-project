import { ICEye } from "@assets/icons/ICEye";
import { Colors } from "@constants/color";
import { withResponsive } from "@constants/container";
import { TranslateContext } from "@contexts/Translation";
import useWindowResize from "@hooks/useWindowResize";
import clsx from "clsx";
import React, { memo, useContext } from "react";

export const TextViewCount = memo(({viewCount, className, colorEye}:{viewCount: number, className?: string, colorEye?: string}) => {
    const {t} = useContext(TranslateContext)
    const {width} = useWindowResize()
  return (
    <div className="flex items-center">
      <ICEye width={width < withResponsive._992 ? 22 : 24} height={width < withResponsive._992 ? 16 : 24} color={colorEye ?? Colors.text_7E8B99} />{" "}
      <span className={clsx("text-text_7E8B99 text-_16 ml-1 m992:ml-2", className)}>
        {viewCount} {t("button.view_count")}
      </span>
    </div>
  );
})
