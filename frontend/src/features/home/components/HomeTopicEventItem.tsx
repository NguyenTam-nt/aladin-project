import { ICArrowLeftLong } from "@assets/icons/ICArrowLeftLong";
import { ImageTranslation } from "@components/ImageTranslation";
import { colorRandom } from "@constants/color";
import { width } from "@constants/container";
import clsx from "clsx";
import React, { useMemo } from "react";

type Props = {
  isReversed?: boolean;
};

export const HomeTopicEventItem = ({ isReversed = false }: Props) => {
  const color = useMemo(() => {
    return colorRandom[Math.floor(Math.random() * colorRandom.length)];
  }, []);
  return (
    <div className={clsx("flex", { "flex-row-reverse": isReversed })}>
      <div className="flex-1 bg-black h-[270px] overflow-hidden"
       style={{
        minWidth: width/4
       }}
      >
        <ImageTranslation link="https://hanoispiritofplace.com/wp-content/uploads/2017/11/hinh-nen-thien-nhien-dep-nhat-8.jpg" />
      </div>
      <div
        className="flex-1 h-[270px] flex flex-col justify-center items-center text-center px-[32px] relative"
        style={{
          background: color.bg,
        }}
      >
        {/* <div > */}
        <p className={`text-_24 leading-[36px] line-clamp-2`}
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
          <ICArrowLeftLong color={color.color} />
        </div>
        {/* </div> */}
        <div className={clsx("absolute event_hom_item_left h-[52px] w-[46px] top-[50%] ", {"event_hom_item_left left-[-46px]":!isReversed, "event_hom_item_right right-[-46px]":isReversed})}
            style={{
             backgroundColor: color.bg
            }}
        />
      </div>
    </div>
  );
};
