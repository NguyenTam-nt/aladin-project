import React from "react";
import WapperContent from "../../../components/WapperContent";
import TableReserVationForm from "@components/form/TableReserVationForm";
import { Banner } from "@components/Banner";
// import Banner from "./Banner";

const TableReserVation = () => {
  return (
    <div>
      {/* <Banner
        dataBanner={{
          name: "navigation.header.order",
          listNavigate: [{ name: "navigation.header.order", path: "/dat-ban" }],
        }}
      /> */}
      <Banner />
      <WapperContent>
        <TableReserVationForm />
      </WapperContent>
    </div>
  );
};

export default TableReserVation;