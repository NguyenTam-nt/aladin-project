import { SIZE_DATA } from "@constants/index";
import { categoryService } from "@services/category";
import type { ICategory } from "@typeRules/category";
import { useState, useEffect, useCallback, useMemo } from "react";

export const useGetCategory = (isAll = false) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [total, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (categories.length === 0) {
      getCategories(0);
    }
  }, []);

  const getCategories = useCallback(
    (page: number) => {
      setLoading(true);
      if(isAll) {
        categoryService.getAll().then((data) => {
          setCategories(data);
        })
      }else{
        categoryService
          .get({ sort: "id,desc", page, size: 12 })
          .then((data) => {
            setCategories([...categories, ...data.list]);
            setTotalPage(data.totalElementPage);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    },
    [categories]
  );

  const totalPages = useMemo(() => {
    return Math.ceil(total / SIZE_DATA);
  }, [total]);

  const fechData = () => {
    if(isAll) return
    if (currentPage <= totalPages) {
      getCategories(currentPage + 1);
      setCurrentPage((page) => page + 1);
    }
  };

  return {
    loading, 
    total,
    categories,
    currentPage,
    setCurrentPage,
    getCategories,
    fechData,
    setCategories,
    totalPages
  };
};
