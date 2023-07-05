import TableReserVationForm from "@components/form/TableReserVationForm";
import { windownSizeWidth, withResponsive } from "@constants/index";
import clsx from "clsx";
import React, { memo } from "react";
import Image1 from "@assets/images/home/bgnews/bg_news_1.webp";

export const TopicForm = () => {
  return (
    <div className="relative">
      {windownSizeWidth > withResponsive._1024 ? (
        <div className="absolute left-0 bottom-[-350px]">
          <img className="w-full h-full" src={Image1} alt="" />
        </div>
      ) : null}

      <TopicFormContent />
    </div>
  );
};

export const TopicFormContent = memo(() => {
  return (
    <div
      className={clsx(" lg:w-rp my-[40px]  lg:my-[120px] relative")}
    >
      <TableReserVationForm isPaddingBottom={false} />
    </div>
  );
});
