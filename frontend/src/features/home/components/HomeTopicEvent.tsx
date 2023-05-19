import { withResponsive } from "@constants/container";
import useWindowResize from "@hooks/useWindowResize";
import React from "react";
import { HomeTopicEventItem } from "./HomeTopicEventItem";
import Event1 from "@assets/images/home_event/_1.jpg";
import Event2 from "@assets/images/home_event/_2.jpg";
import Event3 from "@assets/images/home_event/_3.png";
import Event4 from "@assets/images/home_event/_4.png";

const data = [
  {
    title_vn: 'Tọa đàm "Xây dựng chương trình đào tạo Thạc sĩ Hàn Quốc học"',
    des_vn: "Vào ngày 20 tháng 8 năm 2020, Khoa Hàn Quốc học",
    title_ko: '컨퍼런스 "한국학 석사 과정 구축"',
    des_ko: "2020년 8월 20일, 한국학부",
    image: Event1,
  },
  {
    title_vn:
      "Tổng kết sự kiện ra mắt Trung tâm Học viện King Sejong Hồ Chí Minh 6",
    des_vn: "Hoạt động thú vị và hoành tráng nhằm chào mừng sự kiện ra mắt",
    title_ko: "호치민 세종대왕 아카데미 센터 6호 런칭행사 요약",
    des_ko: "출시 이벤트를 기념하는 신나고 멋진 활동",
    image: Event2,
  },
  {
    title_vn: "Sinh viên Khoa Hàn Quốc học cùng tìm hiểu về quyền tác giả",
    des_vn: "Quyền tác giả do Đoàn TN - Hội SV Khoa Hàn Quốc học tổ chức.",
    title_ko: "저작권에 대해 배우는 한국학부 학생들",
    des_ko: "Copyright by Youth Union - 한국학부 총학생회.",
    image: Event3,
  },
  {
    title_vn: "Gặp gỡ với gần 180 tân sinh viên ngành Hàn Quốc học năm 2022",
    des_vn: "Gặp mặt Tân Sinh viên  với sự góp mặt của Ban Chủ nhiệm",
    title_ko: "2022년에 약 180명의 새로운 한국 전공자들과 만나다",
    des_ko: "이사회 참석으로 신입생 만나기",
    image: Event4,
  },
];

export const HomeTopicEvent = () => {
  const { width } = useWindowResize();

  return (
    <div className="grid grid-cols-1 m992:grid-cols-2">
      <HomeTopicEventItem data={data[0]} />
      <HomeTopicEventItem data={data[1]}  isReversed={width < withResponsive._992} />
      <HomeTopicEventItem data={data[2]}  isReversed={width > withResponsive._992} />
      <HomeTopicEventItem data={data[3]}  isReversed />
    </div>
  );
};
