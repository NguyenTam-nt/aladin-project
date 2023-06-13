import { ICArrowNext } from '@assets/icons/ICArrowNext';
import { ICArrowPre } from '@assets/icons/ICArrowPre';
import { ICPlay } from '@assets/icons/ICPlay';
import { SwiperComponent } from '@components/SwiperComponent';
import { Video } from '@components/Video';
import { Colors } from '@constants/color';
import { useSwiperNavigationRef } from '@hooks/useSwiperNavigationRef';
import React from 'react'
import { SwiperSlide } from 'swiper/react';
const listImage = [
    {
      link: "https://s3-alpha-sig.figma.com/img/2b9e/ebcf/86b3f5e4648acf128a1b7eeed51edea0?Expires=1687132800&Signature=masaB0H414GflGEwv2-rabfdmtDJn6~Dq9BdM7hbAOVP8I4pdUyjzJDHgtnuneWcSotBcZWhJBu-goyKHV4R48n0B6CiLsGYag2UX~ZCXjCGPeyZ155xGWq2hiZ~MXfuazvBtbI3xaCKlCu~8f6gXoO6HtVNwDMwedjZsRg7KxXFm6s8J7TeLIBUmoYScvQuKYQ4oYI~MVOdTmQXbkk6NCwcYeXmsGcqKXm~ZuhzjKEmnnYUxc-4EeAbaHoDhxks6weZOgGA9dkIVwF1rde7A6S-vxjA1Kqm4kC3LKAbK4OVc4F7bxoIU9TKyPb6P1sWh1oy6HyEOfHYNYejB~SptA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      type: "image",
    },
    {
      link: "https://www.w3schools.com/html/mov_bbb.mp4",
      type: "video",
    },
    {
      link: "https://s3-alpha-sig.figma.com/img/2b9e/ebcf/86b3f5e4648acf128a1b7eeed51edea0?Expires=1687132800&Signature=masaB0H414GflGEwv2-rabfdmtDJn6~Dq9BdM7hbAOVP8I4pdUyjzJDHgtnuneWcSotBcZWhJBu-goyKHV4R48n0B6CiLsGYag2UX~ZCXjCGPeyZ155xGWq2hiZ~MXfuazvBtbI3xaCKlCu~8f6gXoO6HtVNwDMwedjZsRg7KxXFm6s8J7TeLIBUmoYScvQuKYQ4oYI~MVOdTmQXbkk6NCwcYeXmsGcqKXm~ZuhzjKEmnnYUxc-4EeAbaHoDhxks6weZOgGA9dkIVwF1rde7A6S-vxjA1Kqm4kC3LKAbK4OVc4F7bxoIU9TKyPb6P1sWh1oy6HyEOfHYNYejB~SptA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      type: "image",
    },
    {
      link: "https://s3-alpha-sig.figma.com/img/2b9e/ebcf/86b3f5e4648acf128a1b7eeed51edea0?Expires=1687132800&Signature=masaB0H414GflGEwv2-rabfdmtDJn6~Dq9BdM7hbAOVP8I4pdUyjzJDHgtnuneWcSotBcZWhJBu-goyKHV4R48n0B6CiLsGYag2UX~ZCXjCGPeyZ155xGWq2hiZ~MXfuazvBtbI3xaCKlCu~8f6gXoO6HtVNwDMwedjZsRg7KxXFm6s8J7TeLIBUmoYScvQuKYQ4oYI~MVOdTmQXbkk6NCwcYeXmsGcqKXm~ZuhzjKEmnnYUxc-4EeAbaHoDhxks6weZOgGA9dkIVwF1rde7A6S-vxjA1Kqm4kC3LKAbK4OVc4F7bxoIU9TKyPb6P1sWh1oy6HyEOfHYNYejB~SptA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      type: "image",
    },
    {
      link: "https://s3-alpha-sig.figma.com/img/2b9e/ebcf/86b3f5e4648acf128a1b7eeed51edea0?Expires=1687132800&Signature=masaB0H414GflGEwv2-rabfdmtDJn6~Dq9BdM7hbAOVP8I4pdUyjzJDHgtnuneWcSotBcZWhJBu-goyKHV4R48n0B6CiLsGYag2UX~ZCXjCGPeyZ155xGWq2hiZ~MXfuazvBtbI3xaCKlCu~8f6gXoO6HtVNwDMwedjZsRg7KxXFm6s8J7TeLIBUmoYScvQuKYQ4oYI~MVOdTmQXbkk6NCwcYeXmsGcqKXm~ZuhzjKEmnnYUxc-4EeAbaHoDhxks6weZOgGA9dkIVwF1rde7A6S-vxjA1Kqm4kC3LKAbK4OVc4F7bxoIU9TKyPb6P1sWh1oy6HyEOfHYNYejB~SptA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      type: "image",
    },
    {
      link: "https://s3-alpha-sig.figma.com/img/2b9e/ebcf/86b3f5e4648acf128a1b7eeed51edea0?Expires=1687132800&Signature=masaB0H414GflGEwv2-rabfdmtDJn6~Dq9BdM7hbAOVP8I4pdUyjzJDHgtnuneWcSotBcZWhJBu-goyKHV4R48n0B6CiLsGYag2UX~ZCXjCGPeyZ155xGWq2hiZ~MXfuazvBtbI3xaCKlCu~8f6gXoO6HtVNwDMwedjZsRg7KxXFm6s8J7TeLIBUmoYScvQuKYQ4oYI~MVOdTmQXbkk6NCwcYeXmsGcqKXm~ZuhzjKEmnnYUxc-4EeAbaHoDhxks6weZOgGA9dkIVwF1rde7A6S-vxjA1Kqm4kC3LKAbK4OVc4F7bxoIU9TKyPb6P1sWh1oy6HyEOfHYNYejB~SptA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      type: "image",
    },
    {
      link: "https://s3-alpha-sig.figma.com/img/2b9e/ebcf/86b3f5e4648acf128a1b7eeed51edea0?Expires=1687132800&Signature=masaB0H414GflGEwv2-rabfdmtDJn6~Dq9BdM7hbAOVP8I4pdUyjzJDHgtnuneWcSotBcZWhJBu-goyKHV4R48n0B6CiLsGYag2UX~ZCXjCGPeyZ155xGWq2hiZ~MXfuazvBtbI3xaCKlCu~8f6gXoO6HtVNwDMwedjZsRg7KxXFm6s8J7TeLIBUmoYScvQuKYQ4oYI~MVOdTmQXbkk6NCwcYeXmsGcqKXm~ZuhzjKEmnnYUxc-4EeAbaHoDhxks6weZOgGA9dkIVwF1rde7A6S-vxjA1Kqm4kC3LKAbK4OVc4F7bxoIU9TKyPb6P1sWh1oy6HyEOfHYNYejB~SptA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      type: "image",
    },
    {
      link: "https://s3-alpha-sig.figma.com/img/2b9e/ebcf/86b3f5e4648acf128a1b7eeed51edea0?Expires=1687132800&Signature=masaB0H414GflGEwv2-rabfdmtDJn6~Dq9BdM7hbAOVP8I4pdUyjzJDHgtnuneWcSotBcZWhJBu-goyKHV4R48n0B6CiLsGYag2UX~ZCXjCGPeyZ155xGWq2hiZ~MXfuazvBtbI3xaCKlCu~8f6gXoO6HtVNwDMwedjZsRg7KxXFm6s8J7TeLIBUmoYScvQuKYQ4oYI~MVOdTmQXbkk6NCwcYeXmsGcqKXm~ZuhzjKEmnnYUxc-4EeAbaHoDhxks6weZOgGA9dkIVwF1rde7A6S-vxjA1Kqm4kC3LKAbK4OVc4F7bxoIU9TKyPb6P1sWh1oy6HyEOfHYNYejB~SptA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      type: "image",
    },
    {
      link: "https://s3-alpha-sig.figma.com/img/2b9e/ebcf/86b3f5e4648acf128a1b7eeed51edea0?Expires=1687132800&Signature=masaB0H414GflGEwv2-rabfdmtDJn6~Dq9BdM7hbAOVP8I4pdUyjzJDHgtnuneWcSotBcZWhJBu-goyKHV4R48n0B6CiLsGYag2UX~ZCXjCGPeyZ155xGWq2hiZ~MXfuazvBtbI3xaCKlCu~8f6gXoO6HtVNwDMwedjZsRg7KxXFm6s8J7TeLIBUmoYScvQuKYQ4oYI~MVOdTmQXbkk6NCwcYeXmsGcqKXm~ZuhzjKEmnnYUxc-4EeAbaHoDhxks6weZOgGA9dkIVwF1rde7A6S-vxjA1Kqm4kC3LKAbK4OVc4F7bxoIU9TKyPb6P1sWh1oy6HyEOfHYNYejB~SptA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      type: "image",
    },
  ];

export const MenuDetailSlider = () => {
    const {
        navigationNextRef,
        navigationPrevRef,
        NavigationElement,
        handleNext,
        handlePre,
        currentIndex,
        onActiveIndexChange,
        setThumbActive,
        activeThumb,
      } = useSwiperNavigationRef();
  return (
    <div className="w-[424px] gap-x-[24px]">
    <SwiperComponent
      initialSlide={1}
      navigationNextRef={navigationNextRef}
      navigationPrevRef={navigationPrevRef}
      onActiveIndexChange={onActiveIndexChange}
      slidesPerView={1}
      thumbs={{
        swiper:
          activeThumb && !activeThumb.destroyed ? activeThumb : null,
      }}
    >
      {listImage.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <div className="w-full h-[424px] rounded-[32px_0_32px_0] !overflow-hidden">
              {item.type === "image" ? (
                <img
                  className="w-full h-full object-cover"
                  src={item.link}
                  alt=""
                />
              ) : (
                <Video src={item.link} controls />
              )}
            </div>
          </SwiperSlide>
        );
      })}
    </SwiperComponent>
    {NavigationElement}
    <div className="mt-[24px] relative">
      <SwiperComponent
        onSwiper={setThumbActive}
        slidesPerView={4}
        spaceBetween={24}
        className="swiper-item-thumb"
      >
        {listImage.map((item, index) => {
          return (
            <SwiperSlide
              key={index}
              className="w-full h-[88px] rounded-[16px_0_16px_0] !overflow-hidden"
            >
              <div className="w-full rounded-[16px_0_16px_0] !overflow-hidden duration-300 ease-in relative h-[88px]">
                {item.type === "image" ? (
                  <img
                    className="w-full h-full object-cover"
                    src={item.link}
                    alt=""
                  />
                ) : (
                  <>
                    <Video src={item.link} />
                    <div className="w-[20px] flex items-center justify-center h-[20px] rounded-[50%] backdrop-blur-[2px] absolute bg-bg_255_255_255_03 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                      <ICPlay />
                    </div>
                  </>
                )}
              </div>
            </SwiperSlide>
          );
        })}
      </SwiperComponent>
      <button
        onClick={handlePre}
        className=" z-[2] flex items-center justify-center backdrop-blur-[2px] absolute bg-bg_255_255_255_08 w-[24px] h-[24px] rounded-[5px_0_5px_0] left-0 top-[50%] translate-x-[-50%] translate-y-[-50%]"
      >
        <ICArrowPre
          color={
            currentIndex <= 0 ? Colors.text_A1A0A3 : Colors.secondary
          }
        />
      </button>
      <button
        onClick={handleNext}
        className=" z-[2] flex items-center justify-center backdrop-blur-[2px] absolute bg-bg_255_255_255_08 w-[24px] h-[24px] rounded-[5px_0_5px_0] right-0 top-[50%] translate-x-[50%] translate-y-[-50%]"
      >
        <ICArrowNext
          color={
            currentIndex >= listImage.length - 1
              ? Colors.text_A1A0A3
              : Colors.secondary
          }
        />
      </button>
    </div>
  </div>
  )
}