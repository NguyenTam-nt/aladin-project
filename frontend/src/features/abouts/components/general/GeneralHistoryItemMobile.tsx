import { TranslateContext } from "@contexts/Translation";
import clsx from "clsx";
import React, { useContext, useMemo } from "react";
import { TextYear } from "./GeneralHistoryItem";
import type { IHistory } from "@typeRules/history";

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

type Props = {
  data: IHistory
}

export const GeneralHistoryItemMobile = ({data}:Props) => {
  const color = useMemo(() => {
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);

  const {isVn, t} = useContext(TranslateContext)

  return (
    <div className={clsx("flex flex-col mb-[24px]")}>
      <div className={clsx("flex items-center")}>
        <div
          className={clsx("line-about-general-mb line-up")}
          style={{
            ["--bg-color-line" as string]: color.bg,
          }}
        />
        <TextYear year={Number(data?.year) === new Date().getFullYear() ? t("common._now") : data.year} color={color.color} />
      </div>
      <div className={clsx("flex items-center my-[16px]")}>
        <div
          className={clsx("line-about-general-mb line-up")}
          style={{
            ["--bg-color-line" as string]: color.bg,
          }}
        />
        <p className="text-_14 text-justify line-clamp-5 w-[70%]">
        {isVn ? data?.description : data?.descriptionKo}
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
          src={data?.image}
          alt=""
        />
      </div>
    </div>
  );
};

// const TextYear = ({ color, year }: { color: string; year: number }) => {
//   return (
//     <p
//       className="text-_40 font-bold "
//       style={{
//         color,
//       }}
//     >
//       {year}
//     </p>
//   );
// };
