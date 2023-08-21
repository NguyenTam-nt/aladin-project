import { ImgHomeContact } from "@assets/icons";
import React from "react";

const ContactSession = () => {
  return (
    <div className="grid grid-cols-7 h-spc400">
      <div className="col-span-3 h-full">
        <img src={ImgHomeContact} alt="" className="h-full object-cover" />
      </div>
      <div className="col-span-4 bg-aqua-aq02"></div>
    </div>
  );
};

export default ContactSession;
