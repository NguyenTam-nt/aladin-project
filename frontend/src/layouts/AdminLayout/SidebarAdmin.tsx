import { rootRouterAdmin } from "@constants/routerAdmin";
import React from "react";
import { SidebarAdminItem } from "./components/SidebarAdminItem";
import { SidebarAdminItemLogOut } from "./components/SidebarAdminItemLogOut";

export const SidebarAdmin = () => {
  return (
    <div className=" border-r-2 border-solid border-br_E9ECEF h-full">
      {rootRouterAdmin.map((item, index) => {
        return <SidebarAdminItem data={item} key={index} />;
      })}
      <SidebarAdminItemLogOut />
    </div>
  );
};
