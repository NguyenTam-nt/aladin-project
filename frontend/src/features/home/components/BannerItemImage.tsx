import { ICArrowSeeMore } from "@assets/icons/ICArrowSeeMore";
import { Button } from "@components/Button";
import { width } from "@constants/container";
import React from "react";
import { useBannerHome } from "../hooks/useBannerHome";

export const BannerItemImage = ({
  data,
  length,
}: {
  data: { iamge: string; title: string; subtitle: string; desc: string };
  length: number;
}) => {
  const { handleMouseIn, handleMouseOut, refImage, refImageDev, refImageLink } =
    useBannerHome(length);

  return (
    <div
      className="flex-1 relative animated-parent"
      onMouseEnter={handleMouseIn}
      onMouseLeave={handleMouseOut}
    >
      <div className="absolute w-full flex h-full z-0" ref={refImage}>
        <div
          ref={refImageDev}
          className="w-[0px] duration-500 flex ease-in-out  overflow-hidden  relative"
        >
          <img
            ref={refImageLink}
            className="h-full object-cover absolute top-0 bottom-0"
            style={{
              width: `${width / 5}px`,
              minWidth: `${width / 5}px`,
              maxWidth: `${width / 5}px`,
            }}
            src={data.iamge}
            alt=""
          />
        </div>
      </div>
      <div className="flex items-center h-full relative">
        <div className="p-[32px]">
          <div className="py-[24px] border-b-[1px] border-solid border-text_white">
            <p className=" text-text_225_225_225_032 text-[24px]">
              {data.title}
            </p>
            <p className=" text-text_225_225_225_088 text-[32px]">
              {data.subtitle}
            </p>
          </div>
          <div className="py-[24px] ">
            <p className="text-text_white text-_18 leading-8  animated-up">
              {data.desc}
            </p>
            <Button
              image={
                <div className=" ml-2">
                  <ICArrowSeeMore />
                </div>
              }
              color="empty"
              text="button.see_more"
              className=" bg-transparent text-text_white text-_16 max-w-[181px] border-[1px] border-solid border-text_white mt-[24px] animated-up-delay"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
