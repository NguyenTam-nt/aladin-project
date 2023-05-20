import { HeaderAdmin } from "layouts/HeaderAdmin";
import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarAdmin } from "./SidebarAdmin";
import { Footer } from "layouts/Footer";

export const AdminLayout = () => {
  return (
    <div>
      <HeaderAdmin />
      <div className="grid grid-cols-[360px_1fr]">
        <div>
          <SidebarAdmin />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};
