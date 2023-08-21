import React, { memo } from "react";
import { Swiper, SwiperProps } from "swiper/react";

type Props = {
  navigationPrevRef?: React.RefObject<HTMLDivElement>;
  navigationNextRef?: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
} & SwiperProps;

const SwiperComponent = memo(
  ({ navigationPrevRef, navigationNextRef, children, ...props }: Props) => {
    return (
      <Swiper
        navigation={{
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
        {...props}
      >
        {children}
      </Swiper>
    );
  }
);

export default SwiperComponent;
