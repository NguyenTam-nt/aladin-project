import { ImageTranslation } from "@components/ImageTranslation";
import React from "react";

const bannerItem = [
  {
    tagName: "Tag green",
    title: `  Nulla ullamcorper volutpat proin integer nisi ullamcorper ut diam.
     Tortor velit orci a mi ac nibh.Nulla ullamcorper volutpat proin
     integer nisi ullamcorper ut diam. Tortor velit orci.`,
    time: "Ngày đăng tải: 23/02/2023",
    image:
      "https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg",
  },
  {
    tagName: "Tag green",
    title: `Nulla ullamcorper volutpat proin integer nisi ullamcorper ut diam.`,
    time: "Ngày đăng tải: 23/02/2023",
    image:
      "https://camerabox.vn/uploads/news/2018_07/chup-anh-phong-canh-thu-vi.jpg",
  },
];

const NewsBanner = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-[24px] mt-[40px]">
      <div className="col-span-1 xl:col-span-2  overflow-hidden h-[435px]  relative">
        <ImageTranslation link={bannerItem[0].image} />
        <div className=" absolute  bottom-[24px]  left-0 mx-[24px] ">
          <p className=" text-_12 bg-green-600 text-center font-bold text-text_white leading-[20px] px-[16px] inline-block ">
            {bannerItem[0].tagName}
          </p>
          <p className=" text-_18 font-bold leading-[32px] text-text_white mt-[10px] line-clamp-3">
            {bannerItem[0].title}
          </p>
          <p className=" text-_14  text-text_white">{bannerItem[0].time}</p>
        </div>
      </div>
      <div className="overflow-hidden h-[435px]  relative">
        <ImageTranslation link={bannerItem[1].image}></ImageTranslation>
        <div className=" absolute  bottom-[24px]  left-0 mx-[24px] ">
          <p className=" text-_12 bg-green-600 text-center font-bold text-text_white leading-[20px] px-[16px] inline-block ">
            {bannerItem[1].tagName}
          </p>
          <p className=" text-_18 font-bold leading-[32px] text-text_white mt-[10px]">
            {bannerItem[1].title}
          </p>
          <p className=" text-_14  text-text_white">{bannerItem[1].time}</p>
        </div>
      </div>
    </div>
  );
};

export default NewsBanner;
