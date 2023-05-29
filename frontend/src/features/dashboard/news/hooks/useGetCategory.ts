import { newsService } from "@services/newsService";
import type { ICategory } from "@typeRules/news";
import { useCallback, useEffect, useMemo, useState } from "react";

export const useGetCategory = (size: number) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [total, setTotalPage] = useState<number>(0);

  useEffect(() => {
    if (categories.length === 0) {
      getCategories(0);
    }
  }, []);


  const getCategories = useCallback(
    (page: number) => {
      newsService.get({ sort: "id,desc", page, size }).then((data) => {
        setCategories([...categories, ...data.data]);
        setTotalPage(data.total);
      });
    },
    [categories, size]
  );

  const totalPages = useMemo(() => {
    return Math.ceil(total / size);
  }, [size, total]);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const fechData = () => {
    if (currentPage <= totalPages) {
      getCategories(currentPage + 1);
      setCurrentPage((page) => page + 1);
    }
  };

  return {
    totalPages,
    fechData,
    categories,
  };
};
