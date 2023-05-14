import clsx from "clsx";
import React, { useMemo } from "react";

const colors = [
  {
    bg: " #3062D4",
    color: "#0091D9",
  },
  {
    bg: "#FF0F53",
    color: "#FF790E",
  },
  {
    bg: " #3062D4",
    color: "##FF0F53",
  },
  {
    bg: "#F59638",
    color: "#05A742",
  },
];

export const GeneralHistoryItemMobile = () => {
  const color = useMemo(() => {
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);

  return (
    <div className={clsx("flex flex-col mb-[24px]")}>
      <div className={clsx("flex items-center")}>
        <div
          className={clsx("line-about-general-mb line-up")}
          style={{
            ["--bg-color-line" as string]: color.bg,
          }}
        />
        <TextYear year="1994" color={color.color} />
      </div>
      <div className={clsx("flex items-center my-[16px]")}>
        <div
          className={clsx("line-about-general-mb line-up")}
          style={{
            ["--bg-color-line" as string]: color.bg,
          }}
        />
        <p className="text-_14 text-justify line-clamp-5 w-[70%]">
          Nghành Hàn Quốc học ra đời trực thuộc Bô môn Đông Á, Khoa Đông phương
          học, Trường Đại học Tổng hợp TP.HCM (tên gọi cũ của Trường ĐH KHXH&NV)
        </p>
      </div>
      <div className={clsx("flex  items-center w-full")}>
        <div
          className={clsx("line-about-general-mb line-up")}
          style={{
            ["--bg-color-line" as string]: color.bg,
          }}
        />
        <img
          className="w-auto max-w-[75%] h-[208px] object-cover"
          src="https://kjvc.com.vn/uploads/tiny_uploads/tin-tuc/29faa76315d5ebbe2c41509ef77d3293_70303_9.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

const TextYear = ({ color, year }: { color: string; year: string }) => {
  return (
    <p
      className="text-_40 font-bold "
      style={{
        color,
      }}
    >
      {year}
    </p>
  );
};
