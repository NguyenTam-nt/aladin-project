import React, { Ref, memo } from "react";
import { Swiper, SwiperProps, SwiperRef } from "swiper/react";

import { Autoplay, EffectFade, FreeMode, Keyboard, Navigation, Thumbs } from "swiper";

type Props = {
  navigationPrevRef?: React.RefObject<HTMLDivElement>;
  navigationNextRef?: React.RefObject<HTMLDivElement>;
  children: React.ReactNode
} & SwiperProps;

export const SwiperComponent = memo(({
  navigationPrevRef,
  navigationNextRef,
  children,
  modules,
  ...props
}: Props) => {
  return (
    <Swiper
      navigation={{
        // Both prevEl & nextEl are null at render so this does not work
        prevEl: navigationPrevRef?.current,
        nextEl: navigationNextRef?.current,
      }}
      onSwiper={(swiper: any) => {
        // Delay execution for the refs to be defined
          setTimeout(() => {
            // Override prevEl & nextEl now that refs are defined
            swiper.params.navigation.prevEl = navigationPrevRef?.current;
            swiper.params.navigation.nextEl = navigationNextRef?.current;
  
            // Re-init navigation
            swiper.navigation?.destroy();
            swiper.navigation?.init();
            swiper.navigation?.update();
          }, 300);
      }}
      modules={[ Keyboard, Navigation, Autoplay, Thumbs, FreeMode, EffectFade]}
      {...props}
    >
    {children}
    </Swiper>
  );
})
