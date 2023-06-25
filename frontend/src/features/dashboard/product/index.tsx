import React, { useEffect, useMemo, useState } from "react";
import { Header } from "./components/Header";
import { ProductItem } from "./components/ProductItem";
import { usePagination } from "@hooks/usePagination";
import { Pagination } from "@components/Paginnation";
import type { IResponseData } from "@typeRules/index";
import type { IProduct } from "@typeRules/product";
import { productService } from "@services/product";
import { SIZE_DATA } from "@constants/index";
import { Loading, useHandleLoading } from "../components/Loading";
import { useSearchParams } from "react-router-dom";
import { useShowMessage } from "../components/DiglogMessage";

export const ProductAdmin = () => {
  const { currentPage, setCurrentPage } = usePagination();
  const [products, setProducts] = useState<IResponseData<IProduct>>();
  const { showLoading } = useHandleLoading();
  const [loading, setLoading] = useState(false)
  const [searchParams, setSearchParam] = useSearchParams();
  const { showError, showSuccess } = useShowMessage();
  const [filterId, setFilterId] = useState<number | undefined>(() => {
    const categoryChild = searchParams.get("categoryChild");
    const categoryParent = searchParams.get("categoryParent");
    if (categoryChild || categoryParent) {
      if (categoryChild) {
        if (typeof Number(categoryChild) === "number")
          return Number(categoryChild);
      } else {
        if (typeof Number(categoryParent) === "number")
          return Number(categoryParent);
      }
    }
    return undefined;
  });

  const handleChangeCategory = (id: number) => {
    setFilterId(id);
  };

  useEffect(() => {
    getProducts(Number(currentPage), filterId);
  }, [currentPage, filterId]);

  const getProducts = (page: number, id?: number) => {
    setLoading(true)
    productService.get({ page, size: SIZE_DATA, id }).then((data) => {
      setProducts(data);
    }).finally(() => {
      setLoading(false)
    })
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

  const handleUpdateData = (data: IProduct) => {
    const newProducts = [...products!.list];
    const index = newProducts.findIndex((item) => item.id === data.id);
    newProducts.splice(index, 1, data);
    if (products) {
      setProducts({
        ...products,
        list: [...newProducts],
      });
    }
  };

  return (
    <>
      <Header idCategory={filterId} onChange={handleChangeCategory} />
        {products?.list.length ?
      <div className="grid grid-cols-4 gap-[24px]">
          { products.list.map((item) => {
              return (
                <ProductItem
                  onUpdate={handleUpdateData}
                  onDelete={handleDelete}
                  data={item}
                  key={item.id}
                />
              );
            })
          }
      </div>
          : (
            loading ? <div className="flex items-center justify-center"><Loading /></div> : null
          )}
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
