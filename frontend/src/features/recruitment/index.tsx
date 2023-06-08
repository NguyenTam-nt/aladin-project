import TitleOfContent from "@components/TitleOfContent";
import WapperContent from "@components/WapperContent";
import React from "react";
import RecruitmentItem from "./RecruitmentItem";
import rectangle from "@assets/images/recruitmentCardIcon.svg";
import Banner from "@features/news/user/Banner";

const Recruitment = () => {
  const fakeDate = [
    {
      url: rectangle,
      title: "Nhân viên phục vụ quán ăn nhà hàng Giang Mỹ Hotpot",
      salary: "10.000.000 - 20.000.000",
      endDate: "Hết hạn: 30/12/2023",
      address: "23 Cự Lộc, Thanh Xuân, Hà Nội",
    },
    {
      url: rectangle,
      title: "Nhân viên phục vụ quán ăn nhà hàng Giang Mỹ Hotpot",
      salary: "10.000.000 - 20.000.000",
      endDate: "Hết hạn: 30/12/2023",
      address: "23 Cự Lộc, Thanh Xuân, Hà Nội",
    },
    {
      url: rectangle,
      title: "Nhân viên phục vụ quán ăn nhà hàng Giang Mỹ Hotpot",
      salary: "10.000.000 - 20.000.000",
      endDate: "Hết hạn: 30/12/2023",
      address: "23 Cự Lộc, Thanh Xuân, Hà Nội",
    },
    {
      url: rectangle,
      title: "Nhân viên phục vụ quán ăn nhà hàng Giang Mỹ Hotpot",
      salary: "10.000.000 - 20.000.000",
      endDate: "Hết hạn: 30/12/2023",
      address: "23 Cự Lộc, Thanh Xuân, Hà Nội",
    },
  ];
  return (
    <div className="pb-spc120">
      <Banner
        dataBanner={{
          name: "navigation.header.ecruitment",
          listNavigate: [
            { name: "navigation.header.ecruitment", path: "/tuyen-dung" },
          ],
        }}
      />
      <WapperContent>
        <div className="pb-[120px]">
          <TitleOfContent name="titleofcontent.recruitment" className="mb-6" />
          <div className="grid grid-cols-2 gap-x-spc26 gap-y-10">
            {fakeDate.map((itemRecrui, indexRecui) => {
              return (
                <RecruitmentItem key={indexRecui} itemRecrui={itemRecrui} />
              );
            })}
          </div>
          <div className="pt-6">pagination</div>
        </div>
      </WapperContent>
    </div>
  );
};

export default Recruitment;
