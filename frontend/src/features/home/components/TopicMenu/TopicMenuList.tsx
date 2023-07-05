import React, { memo } from "react";
import { TopicMenuItem } from "./TopicMenuItem";
import useInView from "@hooks/useInView";
import clsx from "clsx";
import type { IProduct } from "@typeRules/product";

type Props = {
  products: IProduct[];
};

export const TopicMenuList = memo(({ products }: Props) => {
  // const { ref, isInView } = useInView<HTMLDivElement>();
  return (
    <div
      // ref={ref}
      className="grid grid-cols-2 xl:grid-cols-4 gap-[16px] lg:gap-[24px] mt-[48px]"
    >
      {products.map((item, index) => {
        return (
          <div
            key={item.id}
            // className={clsx({
            //   "animate__animated animate__fadeInUp": isInView,
            // })}
            // style={{
            //   ["--animate-count" as string]: index,
            // }}
          >
            <TopicMenuItem  data={item} />
          </div>
        );
      })}
    </div>
  );
});
