import React, { useState } from "react";
import Banner from "./Banner";
import WapperContent from "../../../components/WapperContent";
import TitleOfContent from "@components/TitleOfContent";
import FoodReferialCard from "@components/FoodReferialCard";
import imageCard from "@assets/images/imgCard.png";
import { Pagination } from "@components/Paginnation";
import { windownSizeHeight, windownSizeWidth } from "@constants/index";
// import { Banner } from "@components/Banner";
const PromotionPage = () => {
  console.log(windownSizeWidth, windownSizeHeight, "responsive");
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
      {/* <Banner /> */}
      <Banner
        dataBanner={{
          name: "navigation.header.news",
          listNavigate: [{ name: "navigation.header.news", path: "/tin-tuc" }],
        }}
      />
      <WapperContent>
        <div className="pb-[120px]">
          <TitleOfContent name="titleofcontent.news" className="mb-spc60" />
          <div className="grid grid-cols-4 gap-x-6 gap-y-10 mb-10">
            {fakeData.map((itemFood, indexF) => {
              return <FoodReferialCard key={indexF} itemInforCard={itemFood} />;
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
