import React, { useEffect, useState } from "react";
import { MenuDetailSlider } from "./MenuDetailSlider";
import { MenuDetailInfo } from "./MenuDetailInfo";
import { MenuDetailStar } from "./MenuDetailStar";
import type { IProduct } from "@typeRules/product";
import { useParams } from "react-router-dom";
import { productService } from "@services/product";
import { GroupStar } from "./GroupStar";
export const MenuDetailBody = () => {
  const [product, setProduct] = useState<IProduct>();
  const params = useParams();

  useEffect(() => {
    if (params?.id) {
      productService.getById(Number(params?.id)).then((data) => {
        setProduct(data);
      });
    }
  }, [params?.id]);

  return product ? (
    <div className="w-rp py-[24px] lg:py-[120px]">
      <div className="flex flex-col lg:flex-row gap-x-[24px]">
        <div className=" w-full lg:w-[424px]">
             <MenuDetailSlider data={product?.listMedia ?? []} />

        </div>
        <MenuDetailInfo
          title={product?.name}
          des={product.description}
          price={Number(product.price)}
          pricePromotion={Number(product.pricePromotion)}
          percent={Number(product?.percent ?? 0)}
        />
      </div>
      <GroupStar />
    </div>
  ) : null;
};
