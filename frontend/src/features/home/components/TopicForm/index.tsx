import { ICHomeTopicNewsLeft } from "@assets/icons/ICHomeTopicNewsLeft";
import TableReserVationForm from "@components/form/TableReserVationForm";
import { windownSizeWidth, withResponsive } from "@constants/index";
import useInView from "@hooks/useInView";
import clsx from "clsx";
import React, { memo } from "react";

export const TopicForm = () => {
  return (
    <div className="relative">
      {windownSizeWidth > withResponsive._1024 ? (
        <div className="absolute left-0 bottom-[-350px]">
          <ICHomeTopicNewsLeft />
        </div>
      ) : null}

      <TopicFormContent />
    </div>
  );
};

export const TopicFormContent = memo(() => {
  const {ref, isInView} = useInView<HTMLDivElement>()
  return (
    <div ref={ref} className={clsx(" lg:w-rp my-[40px]  lg:my-[120px] relative", {
      "animate__animated animate__zoomIn": isInView
    })}>
      <TableReserVationForm isPaddingBotton={false} />
    </div>
  );
});
