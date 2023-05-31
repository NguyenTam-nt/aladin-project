import { HeaderAdmin } from "layouts/HeaderAdmin";
import React, { lazy } from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "layouts/Footer";

const SidebarAdmin = lazy(() => import("./SidebarAdmin").then(module => ({default: module.SidebarAdmin})))

export const AdminLayout = () => {
  return (
    <div className="min-w-[1280px] xl:min-w-full ">
      <HeaderAdmin />
      <div className="grid grid-cols-[360px_1fr]">
        <div className="h-full">
          <SidebarAdmin />
        </div>
        <div className="max-w-[calc(1920px-_360px)] min-h-[calc(100vh_-_96px)] px-[24px] 2xl:px-[123px] pt-[40px] pb-[80px]">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};
