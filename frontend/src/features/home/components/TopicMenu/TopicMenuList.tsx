import React, { memo } from "react";
import { TopicMenuItem } from "./TopicMenuItem";
import useInView from "@hooks/useInView";
import clsx from "clsx";

export const TopicMenuList = memo(() => {
  const { ref, isInView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="grid grid-cols-2 xl:grid-cols-4 gap-[16px] lg:gap-[24px] mt-[48px]"
    >
      {[1, 2, 3, 4].map((_, index) => {
        return (
          <div
          key={index}
            className={clsx({
              "animate__animated animate__fadeInUp": isInView,
            })}
            style={{
              ["--animate-count" as string]: index,
            }}
          >
            <TopicMenuItem key={index} />
          </div>
        );
      })}
    </div>
  );
});
