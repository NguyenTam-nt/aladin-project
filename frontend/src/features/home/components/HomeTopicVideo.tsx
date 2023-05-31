import { ICArrowLeftLong } from "@assets/icons/ICArrowLeftLong";
import { SwiperComponent } from "@components/SwiperComponent";
import { Colors } from "@constants/color";
import { withResponsive } from "@constants/container";
import { TranslateContext } from "@contexts/Translation";
import { useHandlePost } from "@features/dashboard/hooks/useHandlePost";
import useInView from "@hooks/useInView";
import useWindowResize from "@hooks/useWindowResize";
import { PostType } from "@typeRules/post";
import clsx from "clsx";
import React, { useContext } from "react";
import { SwiperSlide } from "swiper/react";

export const HomeTopicVideo = () => {
  const { width } = useWindowResize();
  const { ref, isInView } = useInView();
  const { isVn } = useContext(TranslateContext);
  const { listPost } = useHandlePost(PostType.postCenter);

  return (
    listPost.length ? (
    <div className="w-rp mb-[32px] xl:mb-[120px]">
      <SwiperComponent
        slidesPerView={width > withResponsive._768 ? 2 : "auto"}
        spaceBetween={width > withResponsive._768 ? 0 : 16}
      >
        {listPost.map((item, index) => {
          return (
            <SwiperSlide
              key={index}
              className=" max-w-[95%] md:max-w-full h-auto"
            >
              <div
                ref={ref}
                className={clsx({
                  "animate__animated animate__fadeInLeft": isInView,
                })}
              >
                <a
                  href={item?.link}
                  target="blank"
                  className="relative h-[144px] md:h-[282px] home-topic-video-bg px-[32px] flex items-center"
                >
                  <div className="absolute inset-0 z-[-1] ">
                    <img
                      className="w-full h-full object-cover"
                      src={item?.image}
                      alt=""
                    />
                  </div>
                  <div>
                    <p
                      className={clsx(
                        "text-_18 md:text-_24 font-semibold text-text_white line-clamp-1"
                      )}
                    >
                      {isVn ? item?.title : item?.titleKo}
                    </p>
                    <p
                      className={clsx(
                        "text-_14 text-text_225_225_225_064 mt-[8px] mb-[24px] line-clamp-1"
                      )}
                    >
                      {isVn ? item?.description : item?.descriptionKo}
                    </p>
                    <div className={clsx({ "go-right-only": isInView })}>
                      <ICArrowLeftLong width={147} color={Colors.text_white} />
                    </div>
                  </div>
                </a>
              </div>
            </SwiperSlide>
          );
        })}
      </SwiperComponent>
    </div>
  ) : null )
};
