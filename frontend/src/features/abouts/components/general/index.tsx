import React from "react";
import GeneralDetailBuild from "./GeneralDetailBuild";
import { GeneralHistory } from "./GeneralHistory";

const General = () => {
  return (
    <div className="w-rp my-[44px]">
      <GeneralHistory />
      <GeneralDetailBuild />
    </div>
  );
};

export default General;
