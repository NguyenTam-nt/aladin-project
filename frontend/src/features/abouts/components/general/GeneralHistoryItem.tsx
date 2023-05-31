import { TranslateContext } from "@contexts/Translation";
import type { IHistory } from "@typeRules/history";
import clsx from "clsx";
import React, { useContext, useMemo } from "react";

type Props = {
  isReverse?: boolean;
  data: IHistory
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

export const GeneralHistoryItem = ({ isReverse = false, data }: Props) => {
  const colReverse = useMemo(() => {
    return { "flex-col": !isReverse, "flex-col-reverse": isReverse };
  }, [isReverse]);

  const {isVn, t} = useContext(TranslateContext)

  return (
    <div className={clsx("flex h-full", colReverse)}>
      <div className="flex-1 flex justify-between">
        <div className={clsx("flex flex-col items-center", colReverse)}>
            <TextYear year={Number(data?.year) === new Date().getFullYear() ? t("common._now") : data.year} color={ colors[Math.floor(Math.random() * colors.length)].color} />
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
            {isVn ? data?.description : data?.descriptionKo}
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
            className="max-w-[312px] max-h-[208px] object-cover"
            src={data?.image}
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

export const TextYear = ({ color, year }: { color: string; year: number | string }) => {
  return (
    <p
      className="text-_40 font-bold w-max"
      style={{
        color,
      }}
    >
      {year}
    </p>
  );
};
