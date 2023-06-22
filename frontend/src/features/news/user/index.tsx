import React, { useState } from "react";
import Banner from "./Banner";
import WapperContent from "../../../components/WapperContent";
import TitleOfContent from "@components/TitleOfContent";
import imageCard from "@assets/images/imgCard.png";
import { Pagination } from "@components/Paginnation";
import { windownSizeHeight, windownSizeWidth } from "@constants/index";
import NewItem from "@components/NewItem";
// import { Banner } from "@components/Banner";
const PromotionPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const fakeData = [
    {
      img: imageCard,
      description: "Combo 2 Người lớn ăn thả ga không lo hết món",
      timeString: "25/12/2023",
    },
    {
      img: imageCard,
      description: "Combo 2 Người lớn ăn thả ga không lo hết món",
      timeString: "25/12/2023",
    },
    {
      img: imageCard,
      description: "Combo 2 Người lớn ăn thả ga không lo hết món",
      timeString: "25/12/2023",
    },
    {
      img: imageCard,
      description: "Combo 2 Người lớn ăn thả ga không lo hết món",
      timeString: "25/12/2023",
    },
    {
      img: imageCard,
      description: "Combo 2 Người lớn ăn thả ga không lo hết món",
      timeString: "25/12/2023",
    },
    {
      img: imageCard,
      description: "Combo 2 Người lớn ăn thả ga không lo hết món",
      timeString: "25/12/2023",
    },
    {
      img: imageCard,
      description: "Combo 2 Người lớn ăn thả ga không lo hết món",
      timeString: "25/12/2023",
    },
    {
      img: imageCard,
      description: "Combo 2 Người lớn ăn thả ga không lo hết món",
      timeString: "25/12/2023",
    },
  ];
  return (
    <div className="">
      <Banner
        dataBanner={{
          name: "navigation.header.news",
          listNavigate: [{ name: "navigation.header.news", path: "/tin-tuc" }],
        }}
      />

      <WapperContent>
        <div className="md:pb-[120px] pb-20 px-5">
          <TitleOfContent
            name="titleofcontent.news"
            className="md:mb-spc60 mb-6"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  m992:gap-x-6 xl:grid-cols-4 gap-x-5 md:gap-y-10 gap-y-6 mb-10">
            {fakeData.map((itemFood, indexF) => {
              return <NewItem key={indexF} itemInforCard={itemFood} />;
            })}
          </div>
          <div className="flex justify-end">
            <Pagination
              totalPages={20}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </WapperContent>
    </div>
  );
};

export default PromotionPage;
