import NextIcon from "@assets/iconElements/NextIcon";
import PrevIconElm from "@assets/iconElements/PrevIconElm";
import clsx from "clsx";
import React, { memo, useEffect, useMemo } from "react";

/**
 *
 * @author NguBV_dep_trai_yeu_mau_tim
 */

type IPagination = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (currentPage: number) => void;
  limit?: number;
};

export const PaginationCompt = memo((props: IPagination) => {
  const { currentPage, setCurrentPage, limit = 5 } = props;
  const totalPages = props.totalPages;
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const halfMaxPages = Math.floor(limit / 2);

    let startPage = currentPage - halfMaxPages;
    let endPage = currentPage + halfMaxPages;

    if (startPage < 1) {
      startPage = 1;
      endPage = limit;
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = totalPages - limit + 1 >= 1 ? totalPages - limit + 1 : 1;
    }

    for (let i = startPage; i <= endPage; i++) {
      const isActive = currentPage === i;
      pageNumbers.push(
        <button key={i} onClick={() => goToPage(i)}>
          <li
            className={clsx(
              "flex text-text-main rounded-sm h-spc30 w-spc30 items-center justify-center",
              {
                "bg-gray-200": isActive,
                "bg-white": !isActive,
              }
            )}
          >
            {i < 10 && 0}
            {i}
          </li>
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center px-4 gap-1 h-10 rounded-full bg-white">
      {currentPage !== 1 && (
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="w-spc30 h-spc30 flex items-center justify-center"
        >
          <PrevIconElm />
        </button>
      )}

      <ul className="flex flex-row gap-1">{renderPageNumbers()}</ul>
      {currentPage !== totalPages && (
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="w-spc30 h-spc30 flex items-center justify-center"
        >
          <NextIcon />
        </button>
      )}
    </div>
  );
});
