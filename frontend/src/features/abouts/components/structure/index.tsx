import { ICArowLeft } from "@assets/icons/ICArowLeft";
import { ICArowRight } from "@assets/icons/ICArowRight";
import { SwiperComponent } from "@components/SwiperComponent";
import { Colors } from "@constants/color";
import { withResponsive } from "@constants/container";
import { TranslateContext } from "@contexts/Translation";
import { useSwiperNavigationRef } from "@hooks/useSwiperNavigationRef";
import useWindowResize from "@hooks/useWindowResize";
import React, { useContext } from "react";
import { SwiperSlide } from "swiper/react";
import { GeneralDetail } from "../general/GeneralDetail";
import { GeneralTitle } from "../general/GeneralTitle";

const data = [
  {
    title_vn: "3. Danh sách giảng viên và chuyên viên cơ hữu",
    position_vn: "Trưởng Khoa",
    name_vn: "TS. Nguyễn Thị Phương Mai",
    specialized_vn: "Giáo dục tiếng Hàn -  Đại học quốc gia Seoul, Hàn Quốc",
    charge_vn:
      "Phụ trách chung</br>Quản lý công tác nhân sự, hành chính, đối ngoại & hợp tác quốc tế, truyền thông",
    title_ko: "3. 상임 강사 및 전문가 목록",
     position_ko: "학부장",
     name_ko: "Nguyen Thi Phuong Mai 박사",
     special_ko: "한국어 교육 - 서울대학교, 한국",
     charge_ko:
       "부장</br>인사 관리, 행정, ​​외교 및 국제 협력, 커뮤니케이션",
    contact: "Email: nguyenthiphuongmai@gmail.com",
    listImage: [
      "https://kjvc.com.vn/uploads/plugin/news/2018/07/1611805120-8126.jpg",
      "https://kjvc.com.vn/uploads/tiny_uploads/tin-tuc/bcec161ffcf6b953b04c4f5ba3787b7d_10854_1.jpg",
      "https://kjvc.com.vn/uploads/tiny_uploads/tin-tuc/76d790552e8782ba5a6bc76d1bbe0a90_50284_2.jpg",
      "https://kjvc.com.vn/uploads/tiny_uploads/tin-tuc/e5127c25bcc5d3734ba0cabc1d958888_24881_3.jpg",
    ],
  },
  {
    title_vn: "4. Danh sách giảng viên tình nguyện và phái cử",
    position_vn: "Giảng viên phái cử",
    name_vn: "TS. Nguyễn Thị Phương Mai",
    specialized_vn: "Giáo dục tiếng Hàn -  Đại học quốc gia Seoul, Hàn Quốc",
    charge_vn:
      "Phụ trách chung</br>Quản lý công tác nhân sự, hành chính, đối ngoại & hợp tác quốc tế, truyền thông",
    title_ko: "4. 자원봉사자 및 파견강사 명단",
     position_ko: "트레이너 파견",
     name_ko: "Nguyen Thi Phuong Mai 박사",
     special_ko: "한국어 교육 - 서울대학교, 한국",
     charge_ko:
       "부장</br>인사 관리, 행정, ​​외교 및 국제 협력, 커뮤니케이션",
    contact: "Email: nguyenthiphuongmai@gmail.com",
    listImage: [
      "https://kjvc.com.vn/uploads/plugin/news/2018/07/1611805120-8126.jpg",
      "https://kjvc.com.vn/uploads/tiny_uploads/tin-tuc/bcec161ffcf6b953b04c4f5ba3787b7d_10854_1.jpg",
      "https://kjvc.com.vn/uploads/tiny_uploads/tin-tuc/76d790552e8782ba5a6bc76d1bbe0a90_50284_2.jpg",
      "https://kjvc.com.vn/uploads/tiny_uploads/tin-tuc/e5127c25bcc5d3734ba0cabc1d958888_24881_3.jpg",
    ],
  },
];

const data1 = {
  title_vn: "1. Giới thiệu chung",
  content_vn: ' "Hiện nay Khoa Hàn Quốc học có 22 giảng viên và 05 chuyên viên đang giảng dạy, làm việc. Tất cả giảng viên đều tốt nghiệp cao học tại các trường đại học lớn trong và ngoài nước, trong đó có 13 giảng viên đạt trình độ Tiến sĩ và 09 giảng viên đạt trình độ Thạc sĩ. Ngoài ra, Khoa Hàn Quốc học còn có đội ngũ giảng viên thỉnh giảng người Hàn Quốc với chuyên ngành đa dạng và giàu kinh nghiệm."',
  title_ko: "1. 일반 소개",
  content_ko: '"현재 한국학부는 강사 22명과 전문가 05명을 가르치고 활동하고 있습니다. 강사 전원이 국내외 주요 대학의 석사학위 소지자이며 이중 13명이 자격을 갖추고 있습니다. , 한국학부에도 다양하고 경험이 풍부한 한국인 객원강사팀이 있습니다."',
}

const data2 = {
  title_vn: "2. Ban chủ nhiệm và các trưởng bộ môn trực thuộc",
  content_vn: "Trưởng khoa: TS. Nguyễn Thị Phương Mai</br>- Phó Trưởng khoa kiêm Trưởng Bộ môn Văn hóa</br>- Xã hội Hàn Quốc: TS. Lê Hoàng Bảo Trâm- Phó Trưởng khoa kiêm Trưởng Bộ môn Kinh tế - Chính trị - Ngoại giao Hàn Quốc: TS. Phan Thị Anh Thư</br>- Trưởng Bộ môn Ngữ văn Hàn Quốc và Bộ môn E-learning về Hàn Quốc học: TS. Hoàng Thị Trang",
  title_ko: "2. 이사회 및 소속 부서장",
  content_ko: "학장: Dr. Nguyen Thi Phuong Mai 경제</br>- 정치</br> - 한국 외교: Dr. Phan Thi Anh Thu</br>- 한국문학과 한국학 e-러닝학과장: Hoang Thi Trang 박사" ,
}

export const Structure = () => {
  return (
    <div className="w-rp">
      <div>
        <GeneralDetail
         data={data1}
        />
      </div>

      <div>
        <GeneralDetail
         data={data2}
        />
      </div>
      {data.map((item, index) => {
        return <StructureItem key={index} data={item} />;
      })}
    </div>
  );
};

type Props = {
  data: {
    title_vn: string;
    position_vn: string;
    name_vn: string;
    specialized_vn: string;
    charge_vn: string;
    title_ko: string;
    position_ko: string;
    name_ko: string;
    special_ko: string;
    charge_ko: string;
    contact: string;
    listImage: string[];
  };
};

const StructureItem = ({ data }: Props) => {
    const {width} = useWindowResize()
    const {handleNext, handlePre, navigationNextRef, navigationPrevRef, NavigationElement} = useSwiperNavigationRef()
    const {isVn, t} = useContext(TranslateContext)
  return (
    <div className="mt-[24px] xl:mt-[52px]">
      <GeneralTitle title={isVn ? data.title_vn : data.title_ko} />
      <div className="flex flex-col-reverse lg:flex-row gap-[24px] text-text_primary">
        <div className="mt-[24px] xl:mt-[44px] flex-1">
          <div className="flex items-center mb-[8px]">
            <span className="mr-[16px] text-_16 xl:text-_18 text-secondary">
              {isVn ? data.position_vn : data.position_ko}
            </span>
            <div className="h-[1px] w-[185px] bg-text_primary" />
          </div>
          <p className="text-_24 xl:text-_32 font-extrabold mt-[8px]">{isVn ? data.name_vn : data.name_ko}</p>
          <div className="mt-[24px]">
            <p className="text-_16 xl:text-_18 font-semibold  ">
              {t("_about._structure._specialized")}
            </p>
            <p className="text-_14">{isVn ? data.specialized_vn : data.special_ko}</p>
          </div>
          <div className="mt-[16px]">
            <p className="text-_16 xl:text-_18 font-semibold mt-[24px]">
             {t("_about._structure._charge")}
            </p>
            <div
              className="text-_14"
              dangerouslySetInnerHTML={{
                __html: isVn ? data.charge_vn : data.charge_ko,
              }}
            />
          </div>
          <div className="mt-[16px]">
            <p className="text-_16 xl:text-_18 font-semibold mt-[24px]">{t("_about._structure._contact")}</p>
            <p className="text-_14">{data.contact}</p>
          </div>
        </div>

        <div className="relative mt-[24px]"
         style={{
            width: width > withResponsive._1536 ? 1200/2 : width > withResponsive._1024 ? ((width*0.9 / 2) - 24) : "auto",
          }}
        >
          <SwiperComponent
            navigationNextRef={navigationNextRef}
            navigationPrevRef={navigationPrevRef}

            slidesPerView={1}
            style={{
              width: width > withResponsive._1536 ? 1200/2 : width > withResponsive._1024 ? ((width*0.9 / 2) - 24) : "auto",
              margin: 0
            }}
          >
            {data.listImage.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                    <div className="min-w-full h-[216px] sm:h-[416px] overflow-hidden">
                         <img className="min-w-full h-full object-cover" alt="" src={item} />
                    </div>
                </SwiperSlide>
              );
            })}
          </SwiperComponent>
         {NavigationElement}
            <button onClick={handlePre} className="z-[2] cursor-pointer border-[1px] border-solid border-br_E9ECEF absolute top-[50%] left-[-12px] lg:left-[-20px] translate-y-[-50%] w-[24px] h-[24px] lg:w-[40px] lg:h-[40px] flex justify-center items-center bg-bg_225_225_225_07">
                <ICArowLeft width={8} height={16} color={Colors.text_secondary} />
            </button> 

            <button onClick={handleNext} className="z-[2] cursor-pointer border-[1px] border-solid border-br_E9ECEF absolute top-[50%] right-[-12px] lg:right-[-20px] translate-y-[-50%] w-[24px] h-[24px] lg:w-[40px] lg:h-[40px] flex justify-center items-center bg-bg_225_225_225_07">
                <ICArowRight width={8} height={16} color={Colors.text_secondary} />
            </button>
        </div>
      </div>
    </div>
  );
};
