import { Colors } from "@constants/color";
import type { IIcon } from "typeRules/icon";
import React from "react";

export const ICPhone = ({
  color = Colors.text_white,
  width = 20,
  height = 20,
}: IIcon) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.3781 8.03018L18.4611 8.77618L19.9521 8.60818L19.8681 7.86318C19.4111 3.78618 16.2441 0.622182 12.1661 0.169182L11.4201 0.0861816L11.2551 1.57718L12.0001 1.66018C15.3771 2.03518 17.9991 4.65518 18.3781 8.03018Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.8468 8.10049L14.9908 8.83649L16.4628 8.55049L16.3198 7.81449C15.9138 5.73249 14.3078 4.12549 12.2268 3.72149L11.4908 3.57849L11.2038 5.05049L11.9398 5.19349C13.4178 5.48049 14.5588 6.62149 14.8468 8.10049Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.6017 13.6298C11.0817 13.4498 9.5867 12.8458 8.2197 11.4798C6.9367 10.1968 6.4017 8.77878 6.2447 8.28478L7.9437 5.33378L4.2457 0.253784L3.8547 0.483784C2.2727 1.41178 1.1127 2.57178 0.203698 4.13478L0.144698 4.29478C-0.369302 7.03878 1.2017 11.0828 4.0507 14.3588C7.1407 17.9118 11.1527 19.9138 15.1347 19.9138C15.3147 19.9138 15.4957 19.9098 15.6747 19.9018L15.7937 19.8968L15.8967 19.8378C17.4987 18.9408 18.6637 17.7768 19.5597 16.1748L19.7747 15.7898L14.5467 11.9348L11.6017 13.6298Z"
        fill={color}
      />
    </svg>
  );
};
