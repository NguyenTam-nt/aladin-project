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
import { GeneralTitle } from "../general/GeneralTitle";
import { useGetContent } from "@features/abouts/useGetContent";
import { ContentType, IContent } from "@typeRules/content";

export const Structure = () => {
  const { data } = useGetContent(ContentType.structure);
  return (
    <div className="w-rp">
      {/* <div>
        <GeneralDetail
         data={data1}
        />
      </div>

      <div>
        <GeneralDetail
         data={data2}
        />
      </div> */}
      {data.map((item, index) => {
        return <StructureItem key={index} data={item} />;
      })}
    </div>
  );
};

type Props = {
  data: IContent;
};

const StructureItem = ({ data }: Props) => {
  const { width } = useWindowResize();
  const {
    handleNext,
    handlePre,
    navigationNextRef,
    navigationPrevRef,
    NavigationElement,
  } = useSwiperNavigationRef();
  const { isVn } = useContext(TranslateContext);
  return (
    <div className="mt-[24px] xl:mt-[52px]">
      <GeneralTitle title={isVn ? data.title || "" : data.titleKo || ""} />
      <div className="flex flex-col-reverse lg:flex-row gap-[24px] text-text_primary">
        <div
          className="mt-[24px] xl:mt-[44px] flex-1"
          dangerouslySetInnerHTML={{
            __html: isVn ? data.content || "" : data.contentKo || "",
          }}
        ></div>
        {data.files?.length ? (
          <div
            className="relative mt-[24px]"
            style={{
              width:
                width > withResponsive._1536
                  ? 1200 / 2
                  : width > withResponsive._1024
                  ? (width * 0.9) / 2 - 24
                  : "auto",
            }}
          >
            <SwiperComponent
              navigationNextRef={navigationNextRef}
              navigationPrevRef={navigationPrevRef}
              slidesPerView={1}
              style={{
                width:
                  width > withResponsive._1536
                    ? 1200 / 2
                    : width > withResponsive._1024
                    ? (width * 0.9) / 2 - 24
                    : "auto",
                margin: 0,
              }}
            >
              {data.files?.length &&
                data.files.map((item, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <div className="min-w-full h-[216px] sm:h-[416px] overflow-hidden">
                        <img
                          className="min-w-full h-full object-cover"
                          alt=""
                          src={item?.link}
                        />
                      </div>
                    </SwiperSlide>
                  );
                })}
            </SwiperComponent>
            {NavigationElement}
            <button
              onClick={handlePre}
              className="z-[2] cursor-pointer border-[1px] border-solid border-br_E9ECEF absolute top-[50%] left-[-12px] lg:left-[-20px] translate-y-[-50%] w-[24px] h-[24px] lg:w-[40px] lg:h-[40px] flex justify-center items-center bg-bg_225_225_225_07"
            >
              <ICArowLeft width={8} height={16} color={Colors.text_secondary} />
            </button>

            <button
              onClick={handleNext}
              className="z-[2] cursor-pointer border-[1px] border-solid border-br_E9ECEF absolute top-[50%] right-[-12px] lg:right-[-20px] translate-y-[-50%] w-[24px] h-[24px] lg:w-[40px] lg:h-[40px] flex justify-center items-center bg-bg_225_225_225_07"
            >
              <ICArowRight
                width={8}
                height={16}
                color={Colors.text_secondary}
              />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
