import { ICArrowLeftLong } from "@assets/icons/ICArrowLeftLong";
import { ImageTranslation } from "@components/ImageTranslation";
import { colorRandom } from "@constants/color";
import {  withResponsive } from "@constants/container";
import useWindowResize from "@hooks/useWindowResize";
import clsx from "clsx";
import React, { useMemo } from "react";

type Props = {
  isReversed?: boolean;
};

export const HomeTopicEventItem = ({ isReversed = false }: Props) => {
  const color = useMemo(() => {
    return colorRandom[Math.floor(Math.random() * colorRandom.length)];
  }, []);
  const {width} = useWindowResize()
  return (
    <div className={clsx("flex", { "flex-row-reverse": isReversed })}>
      <div className="flex-1 bg-black h-[270px] overflow-hidden"
       style={{
        minWidth: width > withResponsive._992 ? width/4 : width/2
       }}
      >
        <ImageTranslation link="https://hanoispiritofplace.com/wp-content/uploads/2017/11/hinh-nen-thien-nhien-dep-nhat-8.jpg" />
      </div>
      <div
        className="flex-1 h-[270px] flex flex-col justify-center items-center text-center px-[12px] xl:px-[32px] relative"
        style={{
          background: color.bg,
        }}
      >
        {/* <div > */}
        <p className={` font-semibold text-_18 xl:text-_24 leading-[36px] line-clamp-2`}
            style={{color: color.color}}
        >
          Varius cras at risus nunc ut amet amet etiam pharetra elit augue.
        </p>
        <p className="text-_14 mt-[14px] mb-[40px]"
         style={{color: color.color}}

        >
          Nunc pretium cursus et orci nisl. Odio lorem aliquet.
        </p>
        <div className="flex justify-center">
          <ICArrowLeftLong width={width < withResponsive._992 && 72} color={color.color} />
        </div>
        {/* </div> */}
        <div className={clsx("absolute event_hom_item_left h-[52px] w-[46px] top-[50%] translate-y-[-50%]", {"event_hom_item_left left-[-40px]":!isReversed, "event_hom_item_right right-[-40px]":isReversed})}
            style={{
             backgroundColor: color.bg
            }}
        />
      </div>
    </div>
  );
};
