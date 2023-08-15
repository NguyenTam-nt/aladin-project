import React, { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import clsx from "clsx";
import {
  NextAllPageIcon,
  NextPageIcon,
  PreAllPageIcon,
  PrePageIcon,
} from "@assets/icons";

type Props = {
  total: number;
  currenPage: any;
  setCurrentPage: Function;
  limit?: number;
};

function Pagination({ total, currenPage, setCurrentPage, limit }: Props) {
  const navigate = useNavigate();
  let location = useLocation();
  const [searchParams] = useSearchParams();
  const pathName = location.pathname;
  const search = pathName.indexOf("/search");
  const queryStringSearch = location.search;
  const indexEqual = queryStringSearch.indexOf("=");
  const indexAnd = queryStringSearch.indexOf("&");
  const queryString =
    indexAnd != -1
      ? queryStringSearch.slice(indexEqual + 1, indexAnd)
      : queryStringSearch.slice(indexEqual + 1);

  let queryPage = "?";
  if (search != -1) {
    queryPage = `?search=${queryString}&`;
  }
  const [pages, setPages] = useState<number[]>(() => {
    const newArr = [];
    for (let i = 1; i <= total; ++i) {
      newArr.push(i);
    }
    return newArr;
  });

  useEffect(() => {
    const page = searchParams.get("page");
    if (page) {
      setCurrentPage(page);
    }
  }, [searchParams, setCurrentPage]);

  useEffect(() => {
    setPages(() => {
      const newArr = [];
      for (let i = 1; i <= total; ++i) {
        newArr.push(i);
      }
      return newArr;
    });
  }, [total]);

  const renderPaging = () => {
    const arrLimit: number[] = [];
    let li = limit ?? 5;
    for (let i = 1; i <= li; i++) {
      arrLimit.push(i);
    }
    const arr = [
      ...arrLimit,
      +currenPage - 1,
      +currenPage,
      +currenPage + 1,
      pages.length,
    ];
    let xhtml: any = null;
    xhtml = pages.map((page, index) => {
      const isCheck = arr.includes(page);
      return isCheck ? (
        <Link
          to={`${queryPage}page=${page}`}
          key={index}
          className={clsx(
            "mx-1 text-inherit px-4 h-full flex justify-center items-center hover:bg-[#F7F7F1] rounded-md ",
            {
              "text-main": +page === +currenPage,
            }
          )}
        >
          {page}
        </Link>
      ) : page === +currenPage - 2 ? (
        <Link
          to={`${queryPage}page=${page}`}
          key={index}
          className="mx-1 text-inherit px-4 h-full flex justify-center items-center hover:bg-[#F7F7F1] rounded-md"
        >
          ...
        </Link>
      ) : page === +currenPage + 2 && page !== li + 1 ? (
        <Link
          to={`${queryPage}page=${page}`}
          key={index}
          className="mx-1 text-inherit px-4 h-full flex justify-center items-center hover:bg-[#F7F7F1] rounded-md"
        >
          ...
        </Link>
      ) : arrLimit.includes(+currenPage) && page === li + 2 ? (
        <Link
          to={`${queryPage}page=${page}`}
          key={index}
          className="mx-1 text-inherit px-4 h-full flex justify-center items-center hover:bg-[#F7F7F1] rounded-md"
        >
          ...
        </Link>
      ) : (
        ""
      );
    });
    return xhtml;
  };

  const prePage = () => {
    if (currenPage > 1) {
      navigate(`${queryPage}page=${+currenPage - 1}`);
      setCurrentPage(currenPage - 1);
    }
  };

  const nextPage = () => {
    if (currenPage < total) {
      navigate(`${queryPage}page=${+currenPage + 1}`);
      setCurrentPage(+currenPage + 1);
    }
  };

  return (
    <div className=" flex items-center  justify-center font-nomal text-background-100 h-[40px]">
      <span
        onClick={prePage}
        className={clsx(
          "cursor-pointer px-4 h-full flex justify-center items-center hover:bg-[#F7F7F1] rounded-md",
          {
            "opacity-0 cursor-default": currenPage == 1,
          }
        )}
      >
        <PrePageIcon className="" fill="var(--background1)" />
      </span>

      {renderPaging()}

      <span
        onClick={nextPage}
        className={clsx(
          "cursor-pointer px-4 h-full flex justify-center items-center hover:bg-[#F7F7F1] rounded-md",
          {
            "opacity-0 cursor-default": currenPage == total,
          }
        )}
      >
        <NextPageIcon className="" fill="var(--background1)" />
      </span>
    </div>
  );
}

export default Pagination;
