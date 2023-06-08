import React from "react";
import WapperContent from "./WapperContent";
import Banner from "./Banner";
import TableReserVationForm from "@components/form/TableReserVationForm";

const TableReserVation = () => {
  return (
    <div>
      <Banner />
      <WapperContent>
        <TableReserVationForm />
      </WapperContent>
    </div>
  );
};

export default TableReserVation;
