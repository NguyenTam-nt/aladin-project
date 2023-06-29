import React from "react";
interface Props {
  children: React.ReactNode;
}
const WapperContent = (props: Props) => {
  const { children } = props;
  return (
    <div className="2xl:w-[1320px] lg:w-[90vw] lg:px-0 mx-auto lg:pt-spc120 pt-10 h-auto">
      {children}
    </div>
  );
};

export default WapperContent;
