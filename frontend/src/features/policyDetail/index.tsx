import WapperContent from "@components/WapperContent";
import Banner from "@features/news/user/Banner";
import React from "react";
import { useParams } from "react-router-dom";

const PolicyDetail = () => {
  const { id } = useParams();
  return (
    <div>
      <Banner
        dataBanner={{
          name: "navigation.header.policy_detail",
          listNavigate: [
            { name: "navigation.header.policy_detail", path: `/policy/${id}` },
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
          <div className="mt-4">content of policyDetails</div>
        </div>
      </WapperContent>
    </div>
  );
};

export default PolicyDetail;
