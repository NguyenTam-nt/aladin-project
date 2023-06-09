import { ICHomeTopicNewsLeft } from "@assets/icons/ICHomeTopicNewsLeft";
import TableReserVationForm from "@components/form/TableReserVationForm";
import React from "react";

export const TopicForm = () => {
  return (
    <div className="relative">
      <div className="absolute left-0 bottom-[-350px]">
        <ICHomeTopicNewsLeft />
      </div>
      <div className="w-rp mt-[120px] relative">
        <TableReserVationForm />
      </div>
    </div>
  );
};
