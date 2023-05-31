import { pathsAdmin, rootRouterAdmin } from "@constants/routerAdmin";
import React, { useContext } from "react";
import { SidebarAdminItem } from "./components/SidebarAdminItem";
import { SidebarAdminItemLogOut } from "./components/SidebarAdminItemLogOut";
import { AuthContext } from "@contexts/AuthContext";
import { RoleUser } from "@typeRules/user";

export const SidebarAdmin = () => {
  const {user} = useContext(AuthContext)
  return (
    <div className=" border-r-2 border-solid border-br_E9ECEF h-full">
      {rootRouterAdmin.map((item, index) => {
          if(item.path === pathsAdmin.account.prefix && user?.role !== RoleUser.SYSTEM) return null
        return !item.isHidden && <SidebarAdminItem data={item} key={index} />;
      })}
      <SidebarAdminItemLogOut />
    </div>
  );
};
