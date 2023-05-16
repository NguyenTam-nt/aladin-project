import { ImageTranslation } from "@components/ImageTranslation";
import Pagination from "@features/news/components/Paginnation";
import React from "react";

const NewsItem = () => {
  return (
    <div className="h-[212px] xl:h-[461px]  bg-bg_FAFAFA ">
      <div className=" overflow-hidden h-[212px] xl:h-[461px] relative flex flex-1">
        <ImageTranslation link="https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></ImageTranslation>
        <div className=" absolute  bottom-0 left-0  bg-bg_0_0_0_003 h-[84px] w-full flex items-center  text-center justify-center">
          <div>
            <p className=" text-_14 xl:text-_16   text-text_white font-bold  leading-[28px] "> Trần Thảo Linh</p>
            <p className="text-_12 xl:text-_14 text-text_white ">Giảng viên - Tiếng anh</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const data = [1, 2, 3, 4, 5, 6, 7, 8];

const CadresList = () => {
  return (
    <div>      
    <div className="grid grid-cols-2   xl:grid-cols-4 gap-[24px] mt-[24px]">
      {data.map((item) => (
        <NewsItem></NewsItem>
      ))}
    </div>
    <Pagination currentPage={1} totalPages={30} /></div>
  );
};

export default CadresList;
