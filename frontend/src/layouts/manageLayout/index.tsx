import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navleft from "./Navleft";

const LayoutManager = () => {
  return (
    <div className="bg-text_white min-w-[1280px] xl:min-w-full ">
      <div className="grid grid-cols-[300px_1fr]">
        <div className="sticky  z-10 bg-white top-0 left-0 shadow-sm">
          <Navleft />
        </div>
        <div className="relative bg-bg_fafafa">
          <Header />
          <div className="pl-[96px] max-w-[calc(1920px_-_300px)]  min-h-[calc(100vh_-_120px)] py-[80px]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutManager;
