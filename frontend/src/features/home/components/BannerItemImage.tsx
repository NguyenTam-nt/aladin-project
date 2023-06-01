import { ICArrowSeeMore } from "@assets/icons/ICArrowSeeMore";
import { Button } from "@components/Button";
import { withResponsive } from "@constants/container";
import { TranslateContext } from "@contexts/Translation";
import clsx from "clsx";
import React, { memo, useContext } from "react";
import { useBannerHome } from "../hooks/useBannerHome";
import type { IPost } from "@typeRules/post";

export const BannerItemImage = memo(({
  data,
  length,
}: {
  data: IPost;
  length: number;
}) => {
  const { handleMouseIn, handleMouseOut, refImage, refImageDev, refImageLink, withRe, width } =
    useBannerHome(length);
    const {isVn} = useContext(TranslateContext)
    const navigateToDetail = () => {
      const aTag = document.createElement("a")
      aTag.href = data?.link ?? ""
      aTag.target = "_blank"
      aTag.click()
    }
  return (
    <div
      className={clsx("flex-1 relative animated-parent banner_home")}
      onMouseEnter={handleMouseIn}
      onMouseLeave={handleMouseOut} >
      <div className="absolute w-full flex h-full z-0" ref={refImage}>
        <div
          ref={refImageDev}
          className="w-[0px] duration-500 flex ease-in-out  overflow-hidden  relative"
        >
          <div className="absolute inset-0 home-banner-image-bg z-[1]" />
          <img
            ref={refImageLink}
            className="h-full object-cover absolute top-0 bottom-0"
            style={{
              width: `${withRe}px`,
              minWidth: `${withRe}px`,
              maxWidth: `${withRe}px`,
            }}
            src={data.image}
            alt=""
          />
        </div>
      </div>
      <div className="flex items-center  h-full relative">
        <div className="p-[16px] xl:p-[32px] h-[70%] flex flex-col">
          <div className="py-[24px] border-b-[1px] border-solid border-text_white">
            <p className=" text-white text-_16 xl:text-[24px] line-clamp-1">
              {isVn ? data.title : data.titleKo}
            </p>
            {/* <p className=" text-text_225_225_225_088 text-_24 xl:text-[32px] line-clamp-1">
            {isVn ? data.subtitle_vn : data.subtitle_ko}
            </p> */}
          </div>
          <div className="py-[24px] flex-1 flex flex-col">
            <p className="text-text_white text-_14 xl:text-_18 leading-8  animated-up line-clamp-6">
            {isVn ? data.description : data.descriptionKo}
            </p>
            <Button
            onClick={navigateToDetail}
              image={
                <div className="ml-1">
                  <ICArrowSeeMore width={width < withResponsive._1280 ? 24 : 67} />
                </div>
              }
              color="empty"
              text="button.see_more"
              className=" bg-transparent mt-auto text-text_white w-[138px] xl:w-[181px] border-[1px] border-solid border-text_white mt-[24px] animated-up-delay"
            />
          </div>
        </div>
      </div>
    </div>
  );
})
