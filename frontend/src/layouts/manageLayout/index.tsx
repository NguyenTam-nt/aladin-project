import React from "react";
import { Outlet, redirect, useLocation } from "react-router-dom";
import Header from "./Header";
import Navleft from "./Navleft";

const LayoutManager = () => {
  return (
    <div className="bg-text_white">
      <Header />
      <div className="mt-spc120 grid grid-cols-[300px_1fr] min-h-screen">
        <div className="w-[300px]">
          <Navleft />
        </div>
        <div className="pl-24 pt-[86px] pr-[300px] bg-gray_F5F5F5 h-screen overflow-y-scroll font-IBM_Plex_Sans">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutManager;
