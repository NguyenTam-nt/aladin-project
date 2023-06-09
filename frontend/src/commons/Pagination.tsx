// import React, { useCallback } from "react";
// import { useParams, useSearchParams } from "react-router-dom";

// interface Props {
//   totalPage: number;
// }
// const Pagination = ({ totalPage }: Props) => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   console.log(totalPage, searchParams.get("page"));

//   const changePage = useCallback(
//     (page: string | number) => {
//       searchParams.set("page", page as string);
//       setSearchParams(searchParams);
//     },
//     [searchParams, setSearchParams]
//   );
//   return (
//     <div className="flex gap-4">
//       <button
//         onClick={() => changePage(1)}
//         className="px-5 py-3 flex items-center justify-center bg-primary text-white text-sm leading-22 font-bold rounded-tl-lg rounded-br-lg"
//       >
//         1
//       </button>
//       <button
//         onClick={() => changePage(2)}
//         className="px-5 py-3 flex items-center justify-center bg-primary text-white text-sm leading-22 font-bold rounded-tl-lg rounded-br-lg"
//       >
//         2
//       </button>
//     </div>
//   );
// };

// export default Pagination;

import {} from "@assets/icons";
import { AddressWork } from "@assets/icons/AddressWork";
import { ArrowNext } from "@assets/icons/ArrowNext";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

interface Props {
  totalPages: number;
}
const Pagination = (props: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const changePage = useCallback(
    (page: string | number) => {
      searchParams.set("page", page as string);
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );

  const renderPage = useCallback((): JSX.Element => {
    const currentPage: number = Number(searchParams.get("page")) || 1;
    const offset =
      currentPage <= 2
        ? 3 - currentPage
        : currentPage >= props.totalPages - 2
        ? props.totalPages - 2 - currentPage
        : 0;
    return (
      <>
        {currentPage != 1 && (
          <button
            className="flex px-5 py-3 items-center justify-center rounded-tl-lg rounded-br-lg bg-text_white rotate-180"
            onClick={() => changePage(currentPage - 1)}
          >
            <ArrowNext />
            <ArrowNext />
          </button>
        )}
        {[-2, -1, 0, 1, 2].map((it, idx) => {
          const pageNumber = it + currentPage + offset;
          return (
            pageNumber >= 1 &&
            pageNumber <= props.totalPages && (
              <button
                key={idx}
                onClick={() => changePage(pageNumber)}
                className={`flex px-5 py-3  text-sub-title text-brown-100 items-center justify-center text-sm leading-22  rounded-tl-lg rounded-br-lg ${
                  pageNumber == currentPage
                    ? "bg-primary text-text_white font-bold"
                    : " bg-text_white text-text_secondary font-normal"
                }`}
              >
                {pageNumber}
              </button>
            )
          );
        })}
        {currentPage != props.totalPages && (
          <button
            className="flex px-5 py-3 items-center justify-center rounded-tl-lg rounded-br-lg bg-text_white"
            onClick={() => changePage(currentPage + 1)}
          >
            <ArrowNext />
            <ArrowNext />
          </button>
        )}
      </>
    );
  }, [searchParams, props.totalPages]);

  return (
    <div className="flex justify-center md:gap-4 gap-1 w-fit">
      {renderPage()}
    </div>
  );
};

export default Pagination;
