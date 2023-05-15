import { ICArrowDown } from "@assets/icons/ICArrowDown";
import { HeaderTilteLink } from "@components/HeaderTilteLink";
import React from "react";

const optionHeader =[
  "Đào tạo",
  "Nguyên cứu khoa học",
  "Học bổng",
  "Sinh viên",
  "Sinh viên",
  "Sinh viên",
];

type TitleProps = {
    title: string;
  };
  
  const NewTextOptions = ({ title }: TitleProps) => {
    return (
      <button className="ml-[24px] text-text_primary text-_18  font-semibold">
        {title}
      </button>
    );
  };


const NewsHeader = () => {
  return (
   <HeaderTilteLink />
  );
};

export default NewsHeader;
