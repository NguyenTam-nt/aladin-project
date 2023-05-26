import { PAGE_SIZE } from "@constants/contain";
import type { IParams } from "@typeRules/pagination";
import type { IResponseData } from "@typeRules/responsive";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {debounce} from "lodash"

export type Props = {
  getCallback: (params: IParams) => Promise<IResponseData<any>>;
  getBySearch?: (params: IParams, query: string) => Promise<IResponseData<any>>;
};

export function useGetData<T>({ getCallback, getBySearch }: Props) {
  const [searchParam] = useSearchParams();
  const [listData, setListData] = useState<T[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [total, setTotal] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number | string>(
    searchParam.get("page") || 1
  );

  const handleGetData = useCallback((page: number) => {
    getCallback({ page: page - 1, size: PAGE_SIZE }).then((data) => {
        setListData(data.data)
        setTotal(data.total)
    })
  }, [getCallback])

  const handleGetDataBySearch = useCallback((page: number, query:string) => {
    const debounceFuc = debounce(() => {
        getBySearch?.({ page: page - 1, size: PAGE_SIZE }, query).then((data) => {
            setListData(data.data)
            setTotal(data.total)
        })
    }, 300)
    debounceFuc()
  }, [getBySearch])

  useEffect(() => {
    if(!searchQuery) {
        handleGetData(Number(currentPage))
    }else {
        handleGetDataBySearch(Number(currentPage), searchQuery)
    }
  }, [currentPage, searchQuery, handleGetData, handleGetDataBySearch]);



  const handleChangeSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const query = event.target.value;
      if (query.trim() !== "") {
        setSearchQuery(query);
      }
    },
    []
  );

  const totalPage = useMemo(() => {
    return Math.ceil(total/PAGE_SIZE)
  }, [total])

  return {
    handleChangeSearch,
    searchQuery,
    currentPage,
    setCurrentPage,
    listData,
    totalPage
  };
}
