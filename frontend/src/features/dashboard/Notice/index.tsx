import React from "react";
import { HeaderAdmin } from "../components/HeaderAdmin";
import { HeaderFilter } from "./components/HeaderSearch";
import { ListNotice } from "./components/ListNotice";

export const Notice = () => {
  return (
    <>
      <HeaderAdmin title="admin.news._notice._title" />
      <HeaderFilter />
      <ListNotice />
    </>
  );
};
