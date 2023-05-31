import { PAGE_SIZE } from "@constants/contain";
import { PopUpContext } from "@contexts/PopupContext";
import { useHandleCheckbox } from "@features/dashboard/hooks/useHandleCheckbox";
import { usePagination } from "@features/dashboard/hooks/usePagination";
import { newsService } from "@services/newsService";
import type { INews } from "@typeRules/news";
import  { debounce } from "lodash";
import { ChangeEvent, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useHandleNews = () => {

    const [listData, setListData] = useState<INews[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setSearchParam] = useSearchParams()
    const [searchQuery, setSearchQuery] = useState<string>("");
    const {showSuccess, showError} = useContext(PopUpContext)
    const [total, setTotal] = useState<number>(0);
    const [listFilter, setListFilter] = useState<number[]>([]);
    const { currenPage, setCurrentPage } = usePagination();
    const [loading, setLoading] = useState(false)
    const { refCheckboxAll, refCheckboxList, handleCheckAll, handleCheckedItem, listChecked, clearList} =
      useHandleCheckbox(listData.map((item) => item.id ?? 0));
  
    const debounceFuc = useRef<ReturnType<typeof debounce>>();
  
    const handleChangeSearch = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
          setSearchQuery(query);
          if(query.trim()) {
            setCurrentPage(1)
             setSearchParam({page: `1`})
          }
      },
      []
    );
  
    const handleGetData = useCallback(
      (page: number, query: string, listFilter: number[]) => {
        setLoading(true)
        newsService
          .gewNewCategory?.(
            { page: page - 1, size: PAGE_SIZE },
            query,
            listFilter.join(",")
          )
          .then((data) => {
            setListData(data.data);
            setTotal(data.total);
          }).finally(() => {
            setLoading(false)
          })
      },
      []
    );
  
    const handleGetDataBySearch = useCallback(
      (page: number, query: string, listFilter: number[]) => {
        if (debounceFuc.current) debounceFuc.current.cancel();
        debounceFuc.current = debounce(() => {
          handleGetData(page, query, listFilter)
        }, 300);
        debounceFuc.current();
      },
      [handleGetData]
    );
  
    useEffect(() => {
      if (!searchQuery.trim()) {
        if (debounceFuc.current) debounceFuc.current.cancel();
        handleGetData(
          Number(currenPage ?? 1),
          searchQuery,
          listFilter
        );
      } else {
        handleGetDataBySearch(
          Number(currenPage ?? 1),
          searchQuery,
          listFilter
        );
      }
    }, [currenPage, handleGetData, handleGetDataBySearch, listFilter, searchQuery]);
  
    const totalPage = useMemo(() => {
      return Math.ceil(total / PAGE_SIZE);
    }, [total]);
  
    const pushListFilter = useCallback((ids: number[]) => {
      setListFilter(ids)
      setCurrentPage(1)
      setSearchParam({page: `1`})
    }, [])
  
    const clearListFilter = useCallback(() => {
      setListFilter([])
      setCurrentPage(0)
      setSearchParam({page: `1`})
    }, [])
  
    const handleDelete = useCallback((ids:number[]) => {
      newsService.deleteNews(ids.join(",")).then(() => {
        showSuccess("message.success._success")
        let page = Number(currenPage)
        console.log({
        page, totalPage
        })
        if(ids.length >= listData.length && Number(currenPage) >= totalPage) {
          page = page - 1
          setSearchParam({page: `${page}`})
          setCurrentPage(page)
          return
        }
        handleGetData(page, searchQuery, listFilter)
        clearList()
      }).catch(() => {
        showError("message.error._error")
      })
    }, [showSuccess, currenPage, totalPage, listData.length, handleGetData, searchQuery, listFilter, clearList, setSearchParam, setCurrentPage, showError])
  
    const handleDeleteMany = useCallback(() => {
      if(!listChecked.length) return;
      handleDelete(listChecked)
    }, [listChecked, handleDelete])

    return {
        loading,
        handleDeleteMany,
        handleChangeSearch,
        handleCheckAll,
        handleCheckedItem,
        handleDelete,
        handleGetData,
        handleGetDataBySearch,
        refCheckboxAll,
        refCheckboxList,
        pushListFilter,
        clearList,
        clearListFilter,
        currenPage,
         setCurrentPage,
         listChecked,
         listFilter,
         listData,
         totalPage,
         searchQuery
    }

}

