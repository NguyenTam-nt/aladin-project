import { ICArrowSeeMore } from "@assets/icons/ICArrowSeeMore";
import { Button } from "@components/Button";
import { width } from "@constants/container";
import React, { useRef, MouseEvent } from "react";

export const BannerItemImage = ({
  data,
}: {
  data: { iamge: string; title: string; subtitle: string; desc: string };
}) => {
  const refImage = useRef<HTMLDivElement>(null);
  const refImageDev = useRef<HTMLDivElement>(null);
  const refImageLink = useRef<HTMLImageElement>(null);


  const handleMouseIn = (event: MouseEvent<HTMLDivElement>) => {
    refImageDev.current!.style.display = "block"
    const { pageX } = event;
    const { offsetLeft } = event.currentTarget;
    const offset = pageX - offsetLeft;
    console.log({ offset });
    if (offset > width / 5 / 2) {
      refImage.current!.style.flexDirection = "row-reverse";
    //   refImageLink.current!.style.left = `${-width / 5}`
    } else {
      refImage.current!.style.flexDirection = "row";
    //   refImageLink.current!.style.left = "0"
    }

    refImageDev.current!.style.width = "100%";
  };

  const handleMouseOut = (event: MouseEvent<HTMLDivElement>) => {
    const { pageX } = event;
    const { offsetLeft } = event.currentTarget;
    const offset = pageX - offsetLeft;

    if (offset > width / 5 / 2) {
      refImage.current!.style.flexDirection = "row-reverse";
    //   refImageLink.current!.style.left = "0"
    } else {
        refImage.current!.style.flexDirection = "row";
    }

    refImageDev.current!.style.width = "0px";
  };

  return (
    <div
      className="flex-1 relative"
      onMouseEnter={handleMouseIn}
      onMouseLeave={handleMouseOut}
    >
      <div
        className="absolute w-full flex h-full z-0"
        ref={refImage}
      >
        <div
          ref={refImageDev}
          className="w-0 duration-500 flex ease-in-out overflow-hidden relative"
        >
          <img
            ref={refImageLink}
            className="h-full object-cover absolute top-0 bottom-0"
            style={{

              width: width / 5,
              minWidth: width / 5,
              maxWidth: width / 5,
            }}
            src={data.iamge}
            alt=""
          />
        </div>
      </div>
      <div className="mt-[8%] relative">
        <div className="p-[32px]">
          <div className="py-[24px] border-b-[1px] border-solid border-text_white">
            <p className=" text-text_225_225_225_032 text-[24px]">
              {data.title}
            </p>
            <p className=" text-text_225_225_225_088 text-[32px]">
              {data.subtitle}
            </p>
          </div>
          <div className="py-[24px]">
            <p className="text-text_white text-_18 leading-8">{data.desc}</p>
            <Button
              image={
                <div className=" ml-2">
                  <ICArrowSeeMore />
                </div>
              }
              color="empty"
              text="button.see_more"
              className="bg-transparent text-text_white text-_16 w-[181px] border-[1px] border-solid border-text_white mt-[24px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
