import { SwiperComponent } from "@components/SwiperComponent";
import { windownSizeWidth, withResponsive } from "@constants/index";
import React, { memo, useLayoutEffect, useMemo, useState } from "react";
import { SwiperSlide } from "swiper/react";
import { SliderIndicator } from "@components/SliderIndicator";
import { HomeTopicSalesItem } from "./HomeTopicSalesItem";
import useInView from "@hooks/useInView";
import clsx from "clsx";
import { productService } from "@services/product";
import type { IProduct } from "@typeRules/product";

export const HomeTopicSalesSlider = memo(() => {

  const [listProducts, setListProducts] = useState<IProduct[]>([])

  useLayoutEffect(() => {
    productService.getPromotion().then((data) => {
      setListProducts(data)
    })
  }, [])

  const [activeThumb, setThumbActive] = useState<any>(null);
  const width = useMemo(() => {
    return windownSizeWidth > withResponsive._1690
      ? 1600 - 1600 * 0.4 - 80
      : windownSizeWidth > withResponsive._1024
      ? windownSizeWidth - windownSizeWidth * 0.4 - 80
      : windownSizeWidth - 40;
  }, []);
  const dataRender = Array.from({
    length: Math.ceil(
      listProducts.length / (windownSizeWidth > withResponsive._1024 ? 3 : 1)
    ),
  });

  const {ref, isInView} = useInView<HTMLDivElement>()

  return (
    <div ref={ref}>
      <SwiperComponent
        thumbs={{
          swiper: activeThumb && !activeThumb.destroyed ? activeThumb : null,
        }}
        slidesPerView={windownSizeWidth > withResponsive._1024 ? 1 : "auto"}
        spaceBetween={24}
        style={{
          width,
        }}
        initialSlide={0}
      >
        {windownSizeWidth > withResponsive._1024
          ? dataRender.map((_, indexP) => {
              return (
                <SwiperSlide key={indexP}>
                  <div className="grid grid-cols-3 items-center gap-x-[24px]">
                    {listProducts.slice(indexP * 3, indexP * 3 + 3).map((item, index) => {
                      return (
                        <div key={index} className={clsx({
                          "animate__animated animate__fadeInRight": isInView && indexP === 0
                        })}
                        style={{
                          ["--animate-count" as string]: index
                        }}
                        >
                          <HomeTopicSalesItem
                            key={index}
                            data={item}
                            index={indexP * 3 + index + 1}
                          />
                        </div>
                      );
                    })}
                  </div>
                </SwiperSlide>
              );
            })
          : listProducts.map((item, index) => {
              return (
                <SwiperSlide key={index} className="max-w-[70%]">
                  <HomeTopicSalesItem data={item} index={index + 1} />
                </SwiperSlide>
              );
            })}
      </SwiperComponent>
      <div className=" absolute bottom-[24px] left-[50%] translate-x-[-50%]">
        <SliderIndicator
          dataLength={dataRender.length}
          setThumbActive={setThumbActive}
        />
      </div>
    </div>
  );
});
