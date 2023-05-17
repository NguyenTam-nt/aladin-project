import clsx from "clsx";
import React, { useMemo } from "react";

type Props = {
  isReverse?: boolean;
};

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

export const GeneralHistoryItem = ({ isReverse = false }: Props) => {
  const color = useMemo(() => {
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);
  const colReverse = useMemo(() => {
    return { "flex-col": !isReverse, "flex-col-reverse": isReverse };
  }, [isReverse]);

  return (
    <div className={clsx("flex h-full", colReverse)}>
      <div className="flex-1 flex justify-between">
        <div className={clsx("flex flex-col items-center", colReverse)}>
            <TextYear year="1994" color={ colors[Math.floor(Math.random() * colors.length)].color} />
          <div
            className={clsx("line-about-general", {
              "line-down": !isReverse,
              "line-up": isReverse,
            })}
            style={{
              ["--bg-color-line" as string]: colors[Math.floor(Math.random() * colors.length)].bg,
            }}
          />
        </div>
        <div
          className={clsx("flex items-center", colReverse, {
            " mt-[60px]": !isReverse,
            "mb-[60px]": isReverse,
          })}
        >
          <p className="text-_14 text-justify line-clamp-5">
            Nghành Hàn Quốc học ra đời trực thuộc Bô môn Đông Á, Khoa Đông
            phương học, Trường Đại học Tổng hợp TP.HCM (tên gọi cũ của Trường ĐH
            KHXH&NV)
          </p>
          <div
            className={clsx("line-about-general", {
              "line-down": !isReverse,
              "line-up": isReverse,
            })}
            style={{
                ["--bg-color-line" as string]:  colors[Math.floor(Math.random() * colors.length)].bg,
              }}
          />
        </div>
      </div>
      <div className="flex-1 flex justify-center w-full">
        <div
          className={clsx("flex  items-center w-full", {
            "flex-col-reverse": !isReverse,
            "flex-col": isReverse,
          })}
        >
          <img
            className="w-[312px] h-[208px] object-cover"
            src="https://kjvc.com.vn/uploads/tiny_uploads/tin-tuc/29faa76315d5ebbe2c41509ef77d3293_70303_9.jpg"
            alt=""
          />
          <div
            className={clsx("line-about-general", {
              "line-up mb-[8px]": !isReverse,
              "line-down mt-[8px]": isReverse,
            })}
            style={{
                ["--bg-color-line" as string]:  colors[Math.floor(Math.random() * colors.length)].bg,
              }}
          />
        </div>
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
