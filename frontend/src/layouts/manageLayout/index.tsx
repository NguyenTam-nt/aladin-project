import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navleft from "./Navleft";

const LayoutManager = () => {
  return (
    <div className="bg-bg_fafafa min-w-[1280px] relative">
      <div className="fixed w-[300px] z-[12] overflow-y-auto bg-white top-0 bottom-0 left-0 shadow-sm">
        <Navleft />
      </div>
      <div className="w-full grid grid-cols-[300px_1fr] min-h-[calc(100vh)]">
        <div />
        <div className="relative min-w-[calc(1280px_-_300px)] bg-bg_fafafa min-h-[calc(100vh)]">
          <Header />
          <div className=" px-[70px] 2xl:pl-[96px]  min-w-[calc(1280px_-_300px)]  w-full max-w-[calc(1920px_-_300px)]  py-[80px]">
            <div className="max-w-full">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutManager;
