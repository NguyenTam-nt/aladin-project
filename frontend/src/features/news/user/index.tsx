import React from "react";
import Banner from "./Banner";
import WapperContent from "../../../components/WapperContent";
import TitleOfContent from "@components/TitleOfContent";
import FoodReferialCard from "@components/FoodReferialCard";
import imageCard from "@assets/images/imgCard.png";

const PromotionPage = () => {
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
        <div className="pb-[120px]">
          <TitleOfContent name="titleofcontent.news" className="mb-spc60" />
          <div className="grid grid-cols-4 gap-x-6 gap-y-10 mb-10">
            {fakeData.map((itemFood, indexF) => {
              return <FoodReferialCard key={indexF} itemInforCard={itemFood} />;
            })}
          </div>
          <div>pgimation</div>
        </div>
      </WapperContent>
    </div>
  );
};

export default PromotionPage;
