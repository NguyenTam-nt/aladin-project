import { TranslateContext } from "@contexts/Translation";
import useInView from "@hooks/useInView";
import React, {
  useCallback,
  useContext,
  useEffect,
  useId,
} from "react";

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
            <TopicGeneralItem
              key={index}
              total={item.total}
              title={item.title}
            />
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
  const id = useId();
  const { ref, isInView } = useInView();

  const incNbrRec = useCallback(
    (i: number, endNbr: number, elt: HTMLElement | null) => {
      if (i <= endNbr) {
        if (elt) elt.innerHTML = `${i}`;
        setTimeout(function () {
          //Delay a bit before calling the function again.
          incNbrRec(i + 1, endNbr, elt);
        }, 50);
      }
    },
    []
  );

  const incEltNbr = useCallback(
    (id: string) => {
      let elt = document.getElementById(id);
      let endNbr = Number(document.getElementById(id)?.innerHTML);
      incNbrRec(total > 20 ? total - 20 : 0, endNbr, elt);
    },
    [incNbrRec, total]
  );

  const { t } = useContext(TranslateContext);
  useEffect(() => {
    if (isInView) {
      incEltNbr(id);
    }
  }, [id, incEltNbr, isInView]);

  return (
    <div
      //   key={index}
      ref={ref}
      className="flex flex-col items-center justify-center"
    >
      <p
        id={id}
        className="text-[48px] xl:text-[64px] font-bold text-secondary "
        style={{
          ["--counter" as string]: total,
        }}
      >
        {total}
      </p>
      <p className="text-_16 xl:text-_18 font-medium text-text_primary">
        {t(title)}
      </p>
    </div>
  );
};
