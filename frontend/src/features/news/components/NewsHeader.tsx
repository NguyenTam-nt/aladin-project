import { ICArrowDown } from "@assets/icons/ICArrowDown";
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
    <div className="flex flex-1 flex-row  items-center mt-[80px]">
      <p className="text-_40 font-bold text-text_primary mr-[24px]">
        Danh sách tin tức
      </p>
      <div className="h-[2px]  bg-bg_7E8B99 flex-1"></div>
      {optionHeader.slice(0, 4).map((item) => (
        <NewTextOptions title={item} />
      ))}
      {optionHeader.length > 5 ? (
        <>
        <NewTextOptions title={"Khác" } />
        <ICArrowDown />
        </>
      ) : (
        optionHeader.length === 5 && (
          <p className="ml-[24px] text-text_primary text-_18  font-semibold">
            <NewTextOptions title={optionHeader[5]} />
          </p>
        )
      )}
    </div>
  );
};

export default NewsHeader;
