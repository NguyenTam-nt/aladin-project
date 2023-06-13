import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export const usePagination = () => {
  const [searchParam] = useSearchParams();
  const [currentPage, setCurrent] = useState(searchParam.get("page") ?? 1);

  const setCurrentPage = (page: number) => {
    setCurrent(page);
  };

  return {
    currentPage: Number(currentPage),
    setCurrentPage,
  };
};
