import { ICArrowNextPage } from "@assets/icons/ICArrowNextPage";
import { Colors } from "@constants/color";
import { prefixRootRoute } from "@constants/index";
import clsx from "clsx";
import React, { memo, useMemo } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

/**
 * 
 * @author NguBV
*/

type IPagination = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (currentPage: number) => void;
  limit?: number;
};

export const Pagination = memo((props: IPagination) => {
  const { currentPage, setCurrentPage, limit = 5 } = props;
  const totalPages = props.totalPages;
  const [_, setSearchParam] = useSearchParams();
  const { pathname } = useLocation();

  const isAdmin = useMemo(() => {
    return pathname.includes(prefixRootRoute.admin);
  }, [pathname]);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setSearchParam({ page: `${currentPage - 1}` });
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setSearchParam({ page: `${currentPage + 1}` });
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setSearchParam({ page: `${page}` });
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    // const maxPages = 5;
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
              "flex text-text_secondary rounded-[8px_0_8px_0] bg-white h-[40px] w-[40px] border-[1px] items-center justify-center",
              {
                "border-primary !bg-primary text-text_white":
                  isActive && !isAdmin,
                "border-TrueBlue_500 !bg-TrueBlue_500 text-text_white":
                  isActive && isAdmin,
              }
            )}
          >
            {i}
          </li>
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className=" flex gap-x-[8px] lg:gap-x-[16px] mt-[32px] xl:mt-[40px] ">
      {currentPage !== 1 && (
        <div className=" w-[40px] h-[40px]">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="rotate-[-180deg] w-full h-full flex items-center justify-center rounded-[8px_0_8px_0] bg-white"
          >
            <ICArrowNextPage
              color={isAdmin ? Colors.TrueBlue500 : Colors.primary}
            />
          </button>
        </div>
      )}

      <ul className="page-numbers flex flex-row gap-x-[16px]">
        {renderPageNumbers()}
      </ul>
      {currentPage !== totalPages && (
        <div className=" w-[40px] h-[40px]">
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="w-full h-full flex items-center justify-center rounded-[8px_0_8px_0] bg-white"
          >
            <ICArrowNextPage
              color={isAdmin ? Colors.TrueBlue500 : Colors.primary}
            />
          </button>
        </div>
      )}
    </div>
  );
});
