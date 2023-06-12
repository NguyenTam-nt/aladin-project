import React from "react";
import bgWapper from "@assets/images/bg-page-lsht.png";

interface Props {
  children: React.ReactNode;
}
const WapperContent = (props: Props) => {
  const { children } = props;
  return (
    <div
      style={{
        backgroundImage: `url(${bgWapper})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="2xl:w-[1320px] lg:w-[90vw] lg:px-0 mx-auto lg:pt-spc120 pt-10 h-auto"
    >
      {children}
    </div>
  );
};

export default WapperContent;
