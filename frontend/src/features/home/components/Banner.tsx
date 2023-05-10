import { ICArrowSeeMore } from "@assets/icons/ICArrowSeeMore";
import { Button } from "@components/Button";
import { width } from "@constants/container";
import React, { MouseEvent, MouseEventHandler, useRef } from "react";
import { BannerItemImage } from "./BannerItemImage";

const data = [
  {
    iamge:
      "https://www.ckdpharm.com/index/images/main_visual_healthfood-59786192bcfc42d344a97a50d6518a07.jpg",
    title: "Neque ut congue aliquam",
    subtitle: "Neque odio hendrerit",
    desc: "Sem pharetra viverra morbi mi amet odio aliquet. Mauris interdum nunc at.Sem pharetra viverra morbi mi.",
  },
  {
    iamge:
      "https://www.ckdpharm.com/index/images/main_chemical-6c94e8685bb0b657c1f6690383630295.jpg",
    title: "Neque ut congue aliquam",
    subtitle: "Neque odio hendrerit",
    desc: "Sem pharetra viverra morbi mi amet odio aliquet. Mauris interdum nunc at.Sem pharetra viverra morbi mi.",
  },
  {
    iamge:
      "https://www.ckdpharm.com/index/images/main_visual_pharma-f4fc152d039b10dfacfea4b16e8dcb6d.jpg",
    title: "Neque ut congue aliquam",
    subtitle: "Neque odio hendrerit",
    desc: "Sem pharetra viverra morbi mi amet odio aliquet. Mauris interdum nunc at.Sem pharetra viverra morbi mi.",
  },
  {
    iamge:
      "https://www.ckdpharm.com/index/images/main_visual_bio-443deb6d4f63b4c424e219d42b3889e0.jpg",
    title: "Neque ut congue aliquam",
    subtitle: "Neque odio hendrerit",
    desc: "Sem pharetra viverra morbi mi amet odio aliquet. Mauris interdum nunc at.Sem pharetra viverra morbi mi.",
  },
  {
    iamge:
      "https://www.ckdpharm.com/index/images/main_visual_healthfood-59786192bcfc42d344a97a50d6518a07.jpg",
    title: "Neque ut congue aliquam",
    subtitle: "Neque odio hendrerit",
    desc: "Sem pharetra viverra morbi mi amet odio aliquet. Mauris interdum nunc at.Sem pharetra viverra morbi mi.",
  },
];

export const Banner = () => {
  return (
    <div className="banner_home">
      <div className="flex h-full">
        {
            data.map((item, index) => {
                return  <BannerItemImage key={index} data={item} />
            })
        }   
      </div>
    </div>
  );
};
