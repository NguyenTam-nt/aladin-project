import { ICArowLeft } from "@assets/icons/ICArowLeft";
import { ICArowRight } from "@assets/icons/ICArowRight";
import { SwiperComponent } from "@components/SwiperComponent";
import { Colors } from "@constants/color";
import { withResponsive } from "@constants/container";
import { useSwiperNavigationRef } from "@hooks/useSwiperNavigationRef";
import useWindowResize from "@hooks/useWindowResize";
import React from "react";
import { SwiperSlide } from "swiper/react";
import { GeneralDetail } from "../general/GeneralDetail";
import { GeneralTitle } from "../general/GeneralTitle";

const data = [
  {
    title: "3. Danh sách giảng viên và chuyên viên cơ hữu",
    position: "Trưởng Khoa",
    name: "TS. Nguyễn Thị Phương Mai",
    specialized: "Giáo dục tiếng Hàn -  Đại học quốc gia Seoul, Hàn Quốc",
    // subject: ,
    charge:
      "Phụ trách chung</br>Quản lý công tác nhân sự, hành chính, đối ngoại & hợp tác quốc tế, truyền thông",
    contact: "Email: nguyenthiphuongmai@gmail.com",
    listImage: [
      "https://kjvc.com.vn/uploads/plugin/news/2018/07/1611805120-8126.jpg",
      "https://kjvc.com.vn/uploads/tiny_uploads/tin-tuc/bcec161ffcf6b953b04c4f5ba3787b7d_10854_1.jpg",
      "https://kjvc.com.vn/uploads/tiny_uploads/tin-tuc/76d790552e8782ba5a6bc76d1bbe0a90_50284_2.jpg",
      "https://kjvc.com.vn/uploads/tiny_uploads/tin-tuc/e5127c25bcc5d3734ba0cabc1d958888_24881_3.jpg",
    ],
  },
  {
    title: "4. Danh sách giảng viên tình nguyện và phái cử",
    position: "Giảng viên phái cử",
    name: "TS. Nguyễn Thị Phương Mai",
    specialized: "Giáo dục tiếng Hàn -  Đại học quốc gia Seoul, Hàn Quốc",
    // subject: ,
    charge:
      "Phụ trách chung</br>Quản lý công tác nhân sự, hành chính, đối ngoại & hợp tác quốc tế, truyền thông",
    contact: "Email: nguyenthiphuongmai@gmail.com",
    listImage: [
      "https://kjvc.com.vn/uploads/plugin/news/2018/07/1611805120-8126.jpg",
      "https://kjvc.com.vn/uploads/tiny_uploads/tin-tuc/bcec161ffcf6b953b04c4f5ba3787b7d_10854_1.jpg",
      "https://kjvc.com.vn/uploads/tiny_uploads/tin-tuc/76d790552e8782ba5a6bc76d1bbe0a90_50284_2.jpg",
      "https://kjvc.com.vn/uploads/tiny_uploads/tin-tuc/e5127c25bcc5d3734ba0cabc1d958888_24881_3.jpg",
    ],
  },
];

export const Structure = () => {
  return (
    <div className="w-rp">
      <div>
        <GeneralDetail
          title={"1. Giới thiệu chung"}
          content={
            "Hiện nay Khoa Hàn Quốc học có 22 giảng viên và 05 chuyên viên đang giảng dạy, làm việc. Tất cả giảng viên đều tốt nghiệp cao học tại các trường đại học lớn trong và ngoài nước, trong đó có 13 giảng viên đạt trình độ Tiến sĩ và 09 giảng viên đạt trình độ Thạc sĩ. Ngoài ra, Khoa Hàn Quốc học còn có đội ngũ giảng viên thỉnh giảng người Hàn Quốc với chuyên ngành đa dạng và giàu kinh nghiệm."
          }
        />
      </div>

      <div>
        <GeneralDetail
          title={"2. Ban chủ nhiệm và các trưởng bộ môn trực thuộc"}
          content={
            "Trưởng khoa: TS. Nguyễn Thị Phương Mai</br>- Phó Trưởng khoa kiêm Trưởng Bộ môn Văn hóa</br>- Xã hội Hàn Quốc: TS. Lê Hoàng Bảo Trâm- Phó Trưởng khoa kiêm Trưởng Bộ môn Kinh tế - Chính trị - Ngoại giao Hàn Quốc: TS. Phan Thị Anh Thư</br>- Trưởng Bộ môn Ngữ văn Hàn Quốc và Bộ môn E-learning về Hàn Quốc học: TS. Hoàng Thị Trang"
          }
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
    title: string;
    position: string;
    specialized: string;
    name: string;
    charge: string;
    contact: string;
    listImage: string[];
  };
};

const StructureItem = ({ data }: Props) => {
    const {width} = useWindowResize()
    const {handleNext, handlePre, navigationNextRef, navigationPrevRef, NavigationElement} = useSwiperNavigationRef()
  return (
    <div className="mt-[24px] xl:mt-[52px]">
      <GeneralTitle title={data.title} />
      <div className="flex flex-col-reverse lg:flex-row gap-[24px] text-text_primary">
        <div className="mt-[24px] xl:mt-[44px] flex-1">
          <div className="flex items-center mb-[8px]">
            <span className="mr-[16px] text-_16 xl:text-_18 text-secondary">
              {data.position}
            </span>
            <div className="h-[1px] w-[185px] bg-text_primary" />
          </div>
          <p className="text-_24 xl:text-_32 font-extrabold mt-[8px]">{data.name}</p>
          <div className="mt-[24px]">
            <p className="text-_16 xl:text-_18 font-semibold  ">
              Chuyên ngành - Nơi tốt nghiệp
            </p>
            <p className="text-_14">{data.specialized}</p>
          </div>
          <div className="mt-[16px]">
            <p className="text-_16 xl:text-_18 font-semibold mt-[24px]">
              Công việc phụ trách
            </p>
            <div
              className="text-_14"
              dangerouslySetInnerHTML={{
                __html: data.charge,
              }}
            />
          </div>
          <div className="mt-[16px]">
            <p className="text-_16 xl:text-_18 font-semibold mt-[24px]">Liên hệ</p>
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
