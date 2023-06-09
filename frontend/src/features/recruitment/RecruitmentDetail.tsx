import WapperContent from "@components/WapperContent";
import Banner from "@features/news/user/Banner";
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
        <div className="pb-spc120">chi tiết tin tuyển dụng</div>
      </WapperContent>
    </div>
  );
};

export default RecruitmentDetail;
