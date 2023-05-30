import { ICArrowLeftLong } from "@assets/icons/ICArrowLeftLong";
import { ImageTranslation } from "@components/ImageTranslation";
import { colorRandom } from "@constants/color";
import { withResponsive } from "@constants/container";
import { TranslateContext } from "@contexts/Translation";
import useInView from "@hooks/useInView";
import useWindowResize from "@hooks/useWindowResize";
import type { IPost } from "@typeRules/post";
import clsx from "clsx";
import React, { useContext, useMemo } from "react";

type Props = {
  isReversed?: boolean;
  data: IPost
};

export const HomeTopicEventItem = ({ isReversed = false, data }: Props) => {
  const color = useMemo(() => {
    return colorRandom[Math.floor(Math.random() * colorRandom.length)];
  }, []);
  const { width } = useWindowResize();
  const { isVn } = useContext(TranslateContext);
  const {ref, isInView} = useInView()
  return (
    <div ref={ref} className={clsx("flex", { "flex-row-reverse": isReversed, "animate__animated animate__fadeIn":isInView})}>
      <div
        className="flex-1 bg-black h-[270px] overflow-hidden"
        style={{
          minWidth: width > withResponsive._992 ? "25%" : "50%",
        }}
      >
        <ImageTranslation link={data.image ?? ""} />
      </div>
      <a
        href={data?.link}
        target="_blank"
        className="flex-1 h-[270px] flex flex-col justify-center items-center text-center  relative"
        style={{
          background: color.bg,
        }} rel="noreferrer"
      >
        <p
          className={` font-semibold text-_18 px-[32px] xl:text-_24 leading-[36px] line-clamp-2`}
          style={{ color: color.color }}
        >
          {isVn ? data.title : data.titleKo}
        </p>
        <p
          className="text-_14 mt-[14px] mb-[40px] px-[32px]"
          style={{ color: color.color }}
        >
          {isVn ? data.description : data.descriptionKo}
        </p>
        <div
          className={clsx("flex justify-center px-[32px] ", {
            "icon-flipped": !isReversed,
          })}
        >
          <ICArrowLeftLong
            width={width < withResponsive._992 ? 72 : 148}
            color={color.color}
          />
        </div>

        <div
          className={clsx(
            "absolute event_hom_item_left h-[52px] w-[46px] top-[50%] translate-y-[-50%]",
            {
              "event_hom_item_left left-[-40px]": !isReversed,
              "event_hom_item_right right-[-40px]": isReversed,
            }
          )}
          style={{
            backgroundColor: color.bg,
          }}
        />
      </a>
    </div>
  );
};
