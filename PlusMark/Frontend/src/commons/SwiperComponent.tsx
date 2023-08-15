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
        {...props}
      >
        {children}
      </Swiper>
    );
  }
);

export default SwiperComponent;
