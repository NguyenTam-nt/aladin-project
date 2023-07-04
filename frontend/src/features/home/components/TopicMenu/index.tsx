import React, { useEffect, useState } from "react";
import { TopicMenuGroup } from "./TopicMenuGroup";

import Image1 from "@assets/images/home/bgmenu/bg_menu1.webp"
import Image2 from "@assets/images/home/bgmenu/bg_menu2.webp"

import { windownSizeWidth, withResponsive } from "@constants/index";
import type { IProductHome } from "@typeRules/product";
import { productService } from "@services/product";

export const TopicMenu = () => {
  const [products, setProducts] = useState<IProductHome[]>([]);
  useEffect(() => {
    productService.getHome().then((data) => {
      setProducts(data);
    });
  }, []);
  return products.length ? (
    <div className="relative">
      {windownSizeWidth > withResponsive._1024 ? (
        <>
          <div className="absolute left-0 bottom-0 select-none  pointer-events-none">
           <img className="w-full h-full"  src={Image1} alt="" />
          </div>
          <div className="absolute right-0 top-0 select-none  pointer-events-none">
          <img className="w-full h-full"  src={Image2} alt="" />
          </div>
        </>
      ) : null}

      <div className="w-rp py-[40px] lg:py-[120px]">
        <div className="grid grid-cols-1 gap-y-[40px] lg:gap-y-[80px]">
          {products.map((item, index) => {
            return <TopicMenuGroup key={index} data={item} />;
          })}
        </div>
      </div>
    </div>
  ) : null;
};
