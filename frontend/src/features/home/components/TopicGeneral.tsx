import { TranslateContext } from "@contexts/Translation";
import React, { useContext, useEffect, useRef, useState } from "react";

const data = [
  {
    total: 33,
    title: "home.home_topic._general_dh",
  },
  {
    total: 18,
    title: "home.home_topic._general_ts",
  },
  {
    total: 43,
    title: "home.home_topic._general_ths",
  },
  {
    total: 4500,
    title: "home.home_topic._general_sv",
  },
];

export const TopicGeneral = () => {
  const { t } = useContext(TranslateContext);
  return (
    <div className="flex flex-col xl:flex-row items-center w-rp mt-[40px]">
      <h2 className="text-_32 xl:text-_48 font-semibold text-center xl:text-left text-text_primary flex-1">
        {t("home.home_topic._general")}
      </h2>
      <div className=" w-max min-w-[60%] flex justify-around items-center gap-[24px]">
        {data.map((item, index) => {
          return (
            <TopicGeneralItem key={index} total={item.total} title={item.title}/>
          );
        })}
      </div>
    </div>
  );
};

const TopicGeneralItem = ({
  title,
  total,
}: {
  title: string;
  total: number;
}) => {
//   const [totalCount, setTotalCount] = useState(0);
//   const refIn = useRef<any>(null);
  const { t } = useContext(TranslateContext);
//   useEffect(() => {
//     let totalCount1 = 0
//      refIn.current = setInterval(() => {
//         totalCount1 += 1
//         setTotalCount(totalCount1)
//         if(totalCount1 >= total) {
//             clearInterval(refIn.current)
//         }
//     }, 100);
//   }, []);

  return (
    <div
      //   key={index}
      className="flex flex-col items-center justify-center"
    >
      <p
        className="text-[48px] xl:text-[64px] font-bold text-secondary"
        style={{
          ["--counter" as string]: total,
        }}
      >
        {total}
      </p>
      <p className="text-_16 xl:text-_18 font-medium text-text_primary">{t(title)}</p>
    </div>
  );
};
