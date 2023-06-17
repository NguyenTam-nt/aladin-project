import React from "react";
import { Header } from "./components/Header";
import { DiscountItem } from "@features/home/components/DiscountItem";
import { ICStar } from "@assets/icons/ICStar";
import { Colors } from "@constants/color";
import { ICEyeOff } from "@assets/icons/ICEyeOff";
import { formatNumberDot } from "@commons/formatMoney";
import { MoneyLineThrough } from "@features/home/components/MoneyLineThrough";
import { Button } from "../components/Button";
import { ProductItem } from "./components/ProductItem";
import { usePagination } from "@hooks/usePagination";
import { Pagination } from "@components/Paginnation";

export const ProductAdmin = () => {
  const {currentPage, setCurrentPage} = usePagination()
  return (
    <>
      <Header />
      <div className="grid grid-cols-4 gap-[24px]">
          {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((_, index) => {
              return (
                <ProductItem key={index} />
              )
            })
          }
      </div>
      <div className="flex justify-end">
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={10} />
      </div>
    </>
  );
};
