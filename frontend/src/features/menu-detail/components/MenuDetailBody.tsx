import React, { useEffect, useState } from "react";
import { MenuDetailSlider } from "./MenuDetailSlider";
import { MenuDetailInfo } from "./MenuDetailInfo";
import { MenuDetailStar } from "./MenuDetailStar";
import type { IProduct } from "@typeRules/product";
import { useParams } from "react-router-dom";
import { productService } from "@services/product";
import { GroupStar } from "./GroupStar";
import { Loading } from "@features/dashboard/components/Loading";
export const MenuDetailBody = () => {
  const [product, setProduct] = useState<IProduct>();
  const params = useParams();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (params?.id) {
      setLoading(true)
      productService.getById(Number(params?.id)).then((data) => {
        setProduct(data);
      }).finally(() => {
        setLoading(false)
      })
    }
  }, [params?.id]);

  return product ? (
    <div className="w-rp py-[24px] lg:py-[120px]">
      <div className="flex flex-col lg:flex-row gap-x-[24px]">
        <div className=" w-full lg:w-[424px]">
          <MenuDetailSlider data={product?.listMedia ?? []} />
        </div>
        <MenuDetailInfo data={product} />
      </div>
      <GroupStar />
    </div>
  ) : (
    loading ? (
     <div className="flex justify-center items-center"> <Loading /></div>
    ) : null
  );
};
