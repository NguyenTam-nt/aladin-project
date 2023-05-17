import React from "react";
import GeneralDetailBuild from "./GeneralDetailBuild";
import { GeneralHistory } from "./GeneralHistory";

const GeneralPage = () => {
  return (
    <div className="w-rp my-[44px]">
      <GeneralHistory />
      <GeneralDetailBuild />
    </div>
  );
};

export default GeneralPage;
