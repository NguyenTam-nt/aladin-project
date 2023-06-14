import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navleft from "./Navleft";

const LayoutManager = () => {
  return (
    <div className="bg-text_white min-h-[1200px]">
      <Header />
      <div className="mt-spc120 flex">
        <div className="w-[15.8%]">
          <Navleft />
        </div>
        <div className="w-[84.2%] pl-24 pr-[300px] bg-[#F5F5F5]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutManager;
