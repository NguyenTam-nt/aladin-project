import { SIZE_DATA, dataSortProduct } from "@constants/index";
import { useShowMessage } from "@features/dashboard/components/DiglogMessage";
import { useHandleLoading } from "@features/dashboard/components/Loading";
import { usePagination } from "@hooks/usePagination";
import { productService } from "@services/product";
import type { IResponseData } from "@typeRules/index";
import type { IProduct } from "@typeRules/product";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export const useGetProduct = () => {
  const { currentPage, setCurrentPage } = usePagination();
  const [products, setProducts] = useState<IResponseData<IProduct>>();
  const { showLoading } = useHandleLoading();
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParam] = useSearchParams();
  const { showError, showSuccess } = useShowMessage();
  const [filterId, setFilterId] = useState<number | undefined>(() => {
    const categoryParent = searchParams.get("category");
    if (categoryParent) {
      const listCategory = categoryParent.split("-");
      if (listCategory.length >= 2) {
        if (typeof Number(listCategory[1]) === "number")
          return Number(listCategory[1]);
      }
      
      if (typeof Number(listCategory[0]) === "number")
        return Number(listCategory[0]);
     
    }
    return undefined;
  });

  const [sortId, setSortId] = useState<string | undefined>(() => {
    const sortId = searchParams.get("sort");
    if (sortId) {
        return dataSortProduct.find(i => i.slug === sortId)?.action || "id,desc"
    }
    return "id,desc";
  });

  useEffect(() => {
    getProducts(Number(currentPage), filterId, sortId);
  }, [currentPage, filterId, sortId]);

  const getProducts = (page: number, id?: number, sort?:string) => {
    setLoading(true);
    productService
      .get({ page, size: SIZE_DATA, id, sort })
      .then((data) => {
        setProducts(data);
      })
      .finally(() => {
        setLoading(false);
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

  const handleChangeCategory = useCallback((id: number) => {
    setFilterId(id);
  }, []);

  const handleChangeSort = useCallback((sort:string) => {
    setSortId(sort);
  }, []);

  return {
    products,
    handleDelete,
    handleUpdateData,
    loading,
    handleChangeCategory,
    totalPages,
    currentPage,
    setCurrentPage,
    handleChangeSort,
    sortId
  };
};
