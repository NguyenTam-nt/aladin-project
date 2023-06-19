import React from "react";
import { Outlet, redirect, useLocation } from "react-router-dom";
import Header from "./Header";
import Navleft from "./Navleft";

const LayoutManager = () => {
  return (
    <div className="bg-bg_fafafa min-w-[1920px] relative">
      <div className="fixed w-[300px] z-10 bg-white top-0 bottom-0 left-0 shadow-sm">
        <Navleft />
      </div>
      <div className="w-full grid grid-cols-[300px_1fr]">
        <div />
        <div className="relative">
          <Header />
          <div className="pl-[96px]  max-w-[calc(1920px_-_300px)]  min-h-[calc(100vh_-_120px)] py-[80px]">
            <div className=" w-[1224px] ">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutManager;
