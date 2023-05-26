import React from "react";
import { HeaderAdmin } from "../components/HeaderAdmin";
import { HeaderFilter } from "./components/HeaderFilter";
import { ListNews } from "./components/ListNews";

export const News = () => {
  

  return (
    <>
      <HeaderAdmin title="admin.news.title" />
      <HeaderFilter />
      <ListNews />
    </>
  );
};
