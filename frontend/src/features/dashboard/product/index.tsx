import React, { useEffect, useMemo, useState } from "react";
import { Header } from "./components/Header";
import { ProductItem } from "./components/ProductItem";
import { usePagination } from "@hooks/usePagination";
import { Pagination } from "@components/Paginnation";
import type { IResponseData } from "@typeRules/index";
import type { IProduct } from "@typeRules/product";
import { productService } from "@services/product";
import { SIZE_DATA } from "@constants/index";
import { useHandleLoading } from "../components/Loading";
import { useSearchParams } from "react-router-dom";
import { useShowMessage } from "../components/DiglogMessage";

export const ProductAdmin = () => {
  const { currentPage, setCurrentPage } = usePagination();
  const [products, setProducts] = useState<IResponseData<IProduct>>();
  const { showLoading } = useHandleLoading();
  const [searchParams, setSearchParam] = useSearchParams();
  const { showError, showSuccess } = useShowMessage();
  const [filterId, setFilterId] = useState<number>()

  const handleChangeCategory = (id:number) => {
    setFilterId(id)
  }

  useEffect(() => {
    getProducts(Number(currentPage));
  }, [currentPage]);

  const getProducts = (page: number) => {
    productService.get({ page, size: SIZE_DATA }).then((data) => {
      setProducts(data);
    });
  };

  const totalPages = useMemo(() => {
    return Math.ceil(Number(products?.totalElementPage || 0) / SIZE_DATA);
  }, [products?.totalElementPage]);

  const handleDelete = (id: number) => {
    showLoading();
    productService
      .delete(id)
      .then(() => {
        const newProducts = [...products!.list];
        const index = newProducts.findIndex((item) => item.id === id);
        newProducts.splice(index, 1);
        if (Number(currentPage) >= totalPages && newProducts.length <= 0) {
          let page = currentPage;
          page = page - 1;
          setSearchParam({ page: `${page}` });
          setCurrentPage(page);
        } else {
          getProducts(Number(currentPage));
        }
        showSuccess("message.actions.success.delete_banner");
      })
      .catch(() => {
        showError("message.actions.error.delete_banner");
      });
  };

  return (
    <>
      <Header idCategory={filterId} onChange={handleChangeCategory} />
      <div className="grid grid-cols-4 gap-[24px]">
        {products?.list.length &&
          products.list.map((item) => {
            return <ProductItem onDelete={handleDelete} data={item} key={item.id} />;
          })}
      </div>
      <div className="flex justify-end">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </>
  );
};
