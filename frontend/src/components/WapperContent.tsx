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
      className="px-[15%] pt-spc120 h-auto"
    >
      {children}
    </div>
  );
};

export default WapperContent;
