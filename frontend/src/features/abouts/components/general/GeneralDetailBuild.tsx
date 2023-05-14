import React from "react";
import { GeneralDetail } from "./GeneralDetail";

const data = [
  {
    title: "2. Chi tiết hình thành",
    content:
      "Việt Nam và Hàn Quốc chính thức thiết lập quan hệ ngoại giao vào ngày 22 tháng 12 năm 1992, từ đó mối quan hệ hợp tác hữu nghị giữa hai nước không ngừng phát triển về mọi phương diện. Trước tình hình đó, nhiệm vụ đào tạo và nghiên cứu về Hàn Quốc học được đặt ra một cách thiết thực, ngành Hàn quốc học lần lượt được thành lập tại các trường đại học trải khắp ba miền bắc trung nam. Đến nay, Hàn Quốc học ở Việt Nam vẫn tiếp tục phát triển và đã đạt được nhiều thành tựu đáng kể về nhiều phương diện.",
  },
  {
    title: "3. Mục tiêu và sứ mệnh",
    content:
      "Việt Nam và Hàn Quốc chính thức thiết lập quan hệ ngoại giao vào ngày 22 tháng 12 năm 1992, từ đó mối quan hệ hợp tác hữu nghị giữa hai nước không ngừng phát triển về mọi phương diện. Trước tình hình đó, nhiệm vụ đào tạo và nghiên cứu về Hàn Quốc học được đặt ra một cách thiết thực, ngành Hàn quốc học lần lượt được thành lập tại các trường đại học trải khắp ba miền bắc trung nam. Đến nay, Hàn Quốc học ở Việt Nam vẫn tiếp tục phát triển và đã đạt được nhiều thành tựu đáng kể về nhiều phương diện.",
  },
];

const GeneralDetailBuild = () => {
  return (
    <>
      {data.map((item, index) => {
        return (
          <GeneralDetail
            key={index}
            title={item.title}
            content={item.content}
          />
        );
      })}
    </>
  );
};

export default GeneralDetailBuild;
