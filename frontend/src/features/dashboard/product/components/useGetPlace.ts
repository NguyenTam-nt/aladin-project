import { SIZE_DATA } from "@constants/index";
import PlaceService from "@services/PlaceService";
import { categoryService } from "@services/category";
import type { PlaceType } from "@typeRules/place";
import { useState, useEffect, useCallback, useMemo } from "react";

export const useGetPlace = (isAll = false) => {
  const [categories, setCategories] = useState<PlaceType[]>([]);
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
        categoryService.getAllPlace().then((data) => {
            setCategories(data);
        })
      }else {
        categoryService
            .getAllPlaceHome({ sort: "id,desc", page, size: SIZE_DATA })
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
