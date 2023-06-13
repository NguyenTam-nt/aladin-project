import { AddressWork } from "@assets/icons/AddressWork";
import { CalendarIcon } from "@assets/icons/CalendarIcon";
import { DolarIcon } from "@assets/icons/DolarIcon";
import WapperContent from "@components/WapperContent";
import Banner from "@features/news/user/Banner";
import RecuireImage from "@assets/images/imageRecuire.png";
import React from "react";

const RecruitmentDetail = () => {
  return (
    <div>
      <Banner
        dataBanner={{
          name: "navigation.header.ecruitment",
          listNavigate: [
            { name: "navigation.header.ecruitment", path: "/tuyen-dung" },
            { name: "navigation.header.ecruitment", path: "/tuyen-dung" },
          ],
        }}
      />
      <WapperContent>
        <div className="lg:pb-spc120 pb-20 px-5">
          <h3 className="lg:title-32 title-24 leading-[36px] text-secondary uppercase lg:mb-6 mb-4">
            Nhân viên phục vụ quán ăn nhà hàng Bánh Tráng Giang Mỹ
          </h3>
          <div className="flex lg:flex-row lg:gap-5 flex-col">
            <div className="flex gap-2 2xl:mb-0 mb-[18px]">
              <DolarIcon width={20} height={20} />
              <p className="text-lg text-secondary leading-22 font-semibold">
                10.000.000 - 20.000.000
              </p>
            </div>
            <div className="flex gap-2 2xl:mb-0 mb-[18px]">
              <CalendarIcon width={20} height={20} />
              <p className="text-lg leading-22 font-normal">
                Hết hạn: 30/12/2023
              </p>
            </div>
            <div className="flex gap-2">
              <AddressWork width={20} height={20} />
              <p className="text-lg leading-22 font-normal">
                23 Cự Lộc, Thanh Xuân, Hà Nội
              </p>
            </div>
          </div>
          <div className="lg:radius-tl-br48 radius-tl-br24 my-6 overflow-hidden">
            <img
              src={RecuireImage}
              className="w-full lg:min-h-[742px]"
              alt=""
            />
          </div>
          <div>content of recuire</div>
        </div>
      </WapperContent>
    </div>
  );
};

export default RecruitmentDetail;
