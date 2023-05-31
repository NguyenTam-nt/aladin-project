import { ICArrowNextPage } from "@assets/icons/ICArrowNextPage";
import { Colors } from "@constants/color";
import React, { useState } from "react";

type IPagination = {
  currentPage: number;
  totalPages: number;
  setCurrentPage : (currentPage: number) => void;
};

const Pagination = (props: IPagination) => {
  const {currentPage , setCurrentPage } = props
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
    const maxPages = 5;
    const halfMaxPages = Math.floor(maxPages / 2);

    let startPage = currentPage - halfMaxPages;
    let endPage = currentPage + halfMaxPages;

    if (startPage < 1) {
      startPage = 1;
      endPage = maxPages;
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = totalPages - maxPages + 1 >= 1 ? totalPages - maxPages + 1 : 1
    }
    

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button key={i} onClick={() => goToPage(i)}>
          <li
            className="flex mr-[16px] h-[40px] w-[40px] border-[1px] border-secondary items-center justify-center"
            style={{
              borderColor:
                currentPage === i ? Colors.secondary : Colors.br_E9ECEF,
              color: currentPage === i ? Colors.secondary : Colors.text_black,
            }}
          >
            {i}
          </li>
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex flex-1 flex-row  items-center justify-center mt-[32px] xl:mt-[40px] ">
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className="icon-flipped mr-[16px] w-[40px]"
      >
        {currentPage !== 1 && <ICArrowNextPage></ICArrowNextPage>}
      </button>
      <ul className="page-numbers flex flex-row">{renderPageNumbers()}</ul>
      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className="w-[40px]"
      >
        {currentPage !== totalPages && <ICArrowNextPage></ICArrowNextPage>}
      </button>
    </div>
  );
};

export default Pagination;
