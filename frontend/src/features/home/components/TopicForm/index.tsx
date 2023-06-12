import { ICHomeTopicNewsLeft } from "@assets/icons/ICHomeTopicNewsLeft";
import TableReserVationForm from "@components/form/TableReserVationForm";
import { windownSizeWidth, withResponsive } from "@constants/index";
import React from "react";

export const TopicForm = () => {
  return (
    <div className="relative">
      {windownSizeWidth > withResponsive._1024 ? (
        <div className="absolute left-0 bottom-[-350px]">
          <ICHomeTopicNewsLeft />
        </div>
      ) : null}

      <div className=" lg:w-rp mt-[40px] lg:mt-[120px] relative">
        <TableReserVationForm />
      </div>
    </div>
  );
};
