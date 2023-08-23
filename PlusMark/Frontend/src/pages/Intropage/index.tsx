import { Logo } from "@assets/icons";
import Banner from "@components/Banner/Banner";
import BreakCrumb, { BreadcrumbType } from "@components/Breadcrumb";
import LoadingPage from "@components/LoadingPage";
import SlideProductPaginate from "@components/product/SlideProductPaginate";
import useI18n from "@hooks/useI18n";
import IntroServices from "@services/IntroServices";
import convertToHtml from "@utility/convertoHtml";
import React, { useEffect, useState } from "react";

export const Intropage = () => {
  const { t } = useI18n();

  const [content, setcontent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [aboutContent, setAboutContent] = useState({
    introduce: {
      image: "https://supershop.vn/api/image/1689645819835",
      title: "MARKET MOA ",
      content:
        "Moa muốn trở thành thương hiệu sản phẩm được tin dùng và yêu thích của người Việt, vì thế chúng tôi tâm niệm rằng an toàn thực phẩm, chất lượng và sáng tạo là quan điểm xuyên suốt của Sato.Moa cam kết mang đến cho cộng đồng sản phẩm an toàn sức khỏe và chất lượng cao bằng chính sự trân trọng, tình yêu và trách nhiệm của mình với cuộc sống và xã hội.Bằng khát vọng vươn lên cùng chiến lược phát triển bền vững, Sato phấn đấu trở thành công ty Top đầu trong ngành Gia dụng Việt Nam. Chúng tôi sáng tạo, nghiên cứu sản xuất ra các sản phẩm chất lượng, góp phần nâng cao chất lượng cuộc sống người Việt và nâng tầm nền sản xuất công nghiệp tại Việt Nam.MARKET MOA - Phong cách Nhật, Hạnh Phúc Việt!",
    },
    market: {
      image: "https://supershop.vn/api/image/1689645819835",
      title: "MARKET MOA",
      content1: " 는 현대 일본 기술과 베트남 두뇌의 완벽한 조합입니다!",
      content2:
        " 모아는 생명과 사회에 대한 존중과 사랑, 책임감을 담아 지역사회에 안전하고 건강하며 고품질의 제품을 제공하기 위해 최선을 다하고 있습니다.",
    },
  });

  const breakcrumData: BreadcrumbType[] = [
    {
      name: "Trang chủ",
      clickable: true,
      active: false,
      link: "/",
    },
    {
      name: "Giới thiệu",
      clickable: false,
      active: true,
      link: "/",
    },
  ];

  useEffect(() => {
    try {
      setIsLoading(true);
      fetchData()
        .then((data) => {
          // console.log(data.data.data)
          setcontent(data.data.content);
          setIsLoading(false);
        })
        .catch((e) => {
          setIsLoading(false);
        });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }, []);

  const fetchData = async () => {
    return await IntroServices.get();
  };

  return (
    <div>
      <Banner
        className="h-spc230 lg:min-h-[490px] sm:h-[50vh]"
        images={[
          "https://treobangron.com.vn/wp-content/uploads/2023/01/banner-shopee-12.jpg",
        ]}
      />
      <div className="xl:py-spc80 py-8">
        <div className="product_box grid xl:grid-cols-2 grid-cols-1 xl:gap-[87px] gap-8">
          <img
            src={aboutContent.introduce.image}
            alt=""
            className="xl:rounded-lg text-base h-full w-full min-h-spc280"
          />
          <div>
            <p className="text-2xl font-semibold text-main mb-2 uppercase">
              {t("text.title.about_us")}
            </p>
            <p className="xl:text-40 text-title font-bold mb-5 uppercase">
              {aboutContent.introduce.title}
            </p>
            <p className="xl:text-lg text-sm font-normal mb-5 text-left break-words ">
              {aboutContent.introduce.content}
            </p>
          </div>
        </div>
      </div>

      {/* <div className="pl-[173px]">
        <div className="relative">
          <div className="h-[390px] bg-footer absolute top-0 left-0 w-full z-0"></div>
        </div>
      </div> */}

      <div className="product_box xl:pb-28 pb-6 pt-6">
        <p className="xl:text-40 text-title font-bold mb-5 uppercase">
          {aboutContent.market.title}
        </p>
        <div className="grid xl:grid-cols-4 grid-cols-1 gap-5">
          <div className="col-span-1flex items-end">
            <p className="xl:text-base text-sm font-normal break-words max-w-[300px] text-black-bl01">
              {aboutContent.market.content1}
            </p>
          </div>
          <div className="xl:col-span-2 col-span-1 flex justify-center overflow-hidden sc480:mb-0 mb-10">
            <img
              src={aboutContent.market.image}
              className="xl:w-full xl:h-[600px] md:w-spc510 md:h-spc510 sc480:w-spc400 sc480:h-spc400 w-spc300 h-spc300 max-w-[590px] rounded-full"
              alt=""
            />
          </div>
          <div className="col-span-1 flex items-end justify-end">
            <p className="xl:text-base text-sm font-normal break-words max-w-[300px] text-black-bl01">
              {aboutContent.market.content2}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="flex lg:hidden h-9 items-center absolute top-0">
        <BreakCrumb
          data={breakcrumData}
          normalClass="text-wap-regular2"
          activeClass="flex-1 line-clamp-1 font-semibold"
        />
      </div>
      <div className="w-full">
        <h3 className="hidden lg:block text-title font-bold text-black">
          {t("about_us.introduce_title")}
        </h3>
        <div className="h-[105px] flex justify-center mx-8">
          <Logo className="h-full w-auto" />
        </div>
        {!isLoading ? (
          <p
            className="my-8 leading-tight myEditor"
            dangerouslySetInnerHTML={{
              __html: content && convertToHtml(content),
            }}
          ></p>
        ) : (
          <div className="h-48 min-h-full w-full flex justify-center items-center">
            <LoadingPage />
          </div>
        )}
      </div>
    </>
  );
};
