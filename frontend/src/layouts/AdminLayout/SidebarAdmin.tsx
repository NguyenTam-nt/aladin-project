import { rootRouterAdmin } from "@constants/routerAdmin";
import React from "react";
import { SidebarAdminItem } from "./components/SidebarAdminItem";
import { SidebarAdminItemLogOut } from "./components/SidebarAdminItemLogOut";

export const SidebarAdmin = () => {
  return (
    <div>
      {rootRouterAdmin.map((item, index) => {
        return <SidebarAdminItem data={item} key={index} />;
      })}
      <SidebarAdminItemLogOut />
    </div>
  );
};
