import React from "react";
import bgWapper from "@assets/images/bg-page-lsht.png";

interface Props {
  children: React.ReactNode;
}
const WapperContent = (props: any) => {
  const { children } = props;
  return (
    <div
      style={{
        backgroundImage: `url(${bgWapper})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="px-[15%] pt-[120px] h-auto"
    >
      {children}
    </div>
  );
};

export default WapperContent;
