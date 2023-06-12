import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navleft from "./Navleft";

const LayoutManager = () => {
  return (
    <div className="bg-text_white min-h-[1200px]">
      <Header />
      <div className="pt-spc120 flex">
        <div className="w-[15.6%]">
          <Navleft />
        </div>
        <div className="w-[84.4%]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutManager;
