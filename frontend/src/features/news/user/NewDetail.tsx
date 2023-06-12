import React from "react";
import { useParams } from "react-router-dom";
import Banner from "./Banner";
import WapperContent from "@components/WapperContent";

const NewDetail = () => {
  const { id } = useParams();
  return (
    <div>
      <Banner
        dataBanner={{
          name: "navigation.header.news",
          listNavigate: [
            { name: "navigation.header.news", path: "/tin-tuc" },
            { name: "navigation.header.newDetail", path: `/tin-tuc/${id}` },
          ],
        }}
      />
      <WapperContent>
        <div className="pb-spc120 px-5">
          <h3 className="lg:title-32 title-24 leading-[36px] text-secondary uppercase mb-6">
            LONG WANG CHÍNH THỨC KHAI TRƯƠNG CƠ SỞ TẠI 539 MINH KHAI TẶNG
            VOUCHER 20% TOÀN BỘ MENU ĐỒ ĂN TỪ NGÀY 15/03 - 31/03
          </h3>
          <p className="font-semibold text-base text-GreyPrimary">
            Tưng bừng khai trương Long Wang - Lẩu hấp thủy nhiệt Hồng Kông cơ sở
            tại 539 Minh Khai, Vĩnh Tuy, Hai Bà Trưng, Long Wang tặng ngay
            voucher 20% toàn bộ menu đồ ăn từ 15/03-31/03.
          </p>
          <div className="mt-4">content of news</div>
        </div>
      </WapperContent>
    </div>
  );
};

export default NewDetail;
