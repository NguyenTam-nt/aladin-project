import React from "react";
import WapperContent from "../../../components/WapperContent";
import TableReserVationForm from "@components/form/TableReserVationForm";
import { Banner } from "@components/Banner";
import { HomeTopicType } from "@typeRules/home";
// import Banner from "./Banner";

const TableReserVation = () => {
  return (
    <div>
      {/* <Banner type={HomeTopicType.book} /> */}
      <Banner type={HomeTopicType.menu} />
      <WapperContent>
        <TableReserVationForm />
      </WapperContent>
    </div>
  );
};

export default TableReserVation;
