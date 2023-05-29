import React from "react";
import { HeaderAdmin } from "../components/HeaderAdmin";
import { HeaderFilter } from "./components/HeaderFilter";
import { ListDocuments } from "./components/ListDocuments";

export const ManageDocuments = () => {
  return (
    <>
      <HeaderAdmin title="admin.navigation._file" />
      <HeaderFilter />
      <ListDocuments />
    </>
  );
};
