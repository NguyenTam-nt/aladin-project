import React from "react";
import { Outlet } from "react-router-dom";

const LayoutManage = () => {
  return (
    <div className="pt-spc120 bg-text_white min-h-[1200px]">
      <div>header</div>
      <div>Navbar Left</div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutManage;
