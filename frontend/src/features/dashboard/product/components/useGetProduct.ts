import { SIZE_DATA, dataSortProduct } from "@constants/index"
import { useShowMessage } from "@features/dashboard/components/DiglogMessage"
import { useHandleLoading } from "@features/dashboard/components/Loading"
import { usePagination } from "@hooks/usePagination"
import { productService } from "@services/product"
import type { IResponseData } from "@typeRules/index"
import type { IProduct } from "@typeRules/product"
import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  ChangeEvent,
  useRef,
} from "react"
import { debounce } from "lodash"
import { useSearchParamHook } from "@hooks/useSearchParam"
export const useGetProduct = (
  pageSize = SIZE_DATA,
  sort = "id,desc",
  isAdmin = false
) => {
  const { currentPage, setCurrentPage } = usePagination()
  const [products, setProducts] = useState<IResponseData<IProduct>>()
  const { showLoading } = useHandleLoading()
  const [loading, setLoading] = useState(false)
  const { searchParams, setSearchParam, setQueries } = useSearchParamHook()
  const { showError, showSuccess } = useShowMessage()
  const [querySearch, setSearchQuery] = useState<string | undefined>(() => {
    const query = searchParams.get("query")
    if (query) {
      return query
    }
    return undefined
  })
  const debounceTime = useRef<ReturnType<typeof debounce>>()

  const [filterId, setFilterId] = useState<number | undefined>(() => {
    const categoryParent = searchParams.get("category")
    if (categoryParent) {
      const listCategory = categoryParent.split("-")
      if (listCategory.length >= 2) {
        if (typeof Number(listCategory[1]) === "number")
          return Number(listCategory[1])
      }

      if (typeof Number(listCategory[0]) === "number")
        return Number(listCategory[0])
    }
    return undefined
  })

  const [sortId, setSortId] = useState<string | undefined>(() => {
    const sortId = searchParams.get("sort")
    if (sortId) {
      return dataSortProduct.find((i) => i.slug === sortId)?.action || sort
    }
    return sort
  })

  useEffect(() => {
    if (!searchParams.get("sort")) {
      setSortId(sort)
    }

    if (!searchParams.get("category")) {
      setFilterId(undefined)
    }

    if (!searchParams.get("query")) {
      setSearchQuery(undefined)
    }
  }, [searchParams])

  useEffect(() => {
    if (debounceTime.current) debounceTime.current.cancel()
    if (querySearch?.trim()) {
      debounceTime.current = debounce(() => {
        getProductsSearch(
          Number(currentPage),
          filterId,
          sortId,
          querySearch.trim()
        )
      }, 300)
      debounceTime.current()
    } else {
      getProducts(Number(currentPage), filterId, sortId)
    }
  }, [currentPage, filterId, sortId, querySearch?.trim()])

  const getProducts = (page: number, id?: number, sort?: string) => {
    setLoading(true)
    if (isAdmin) {
      productService
        .getProductAdmin({ page, size: pageSize, id, sort })
        .then((data) => {
          setProducts(data)
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      productService
        .get({ page, size: pageSize, id, sort })
        .then((data) => {
          setProducts(data)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  const getProductsSearch = (
    page: number,
    id?: number,
    sort?: string,
    query?: string
  ) => {
    setLoading(true)
    productService
      .search({ page, size: pageSize, id, sort, query })
      .then((data) => {
        setProducts(data)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const totalPages = useMemo(() => {
    return Math.ceil(Number(products?.totalElementPage || 0) / pageSize)
  }, [products?.totalElementPage])

  const handleDelete = (id: number) => {
    showLoading()
    productService
      .delete(id)
      .then(() => {
        const newProducts = [...products!.list]
        const index = newProducts.findIndex((item) => item.id === id)
        newProducts.splice(index, 1)
        if (Number(currentPage) >= totalPages && newProducts.length <= 0) {
          let page = currentPage
          page = page - 1
          setSearchParam({ page: `${page}` })
          setCurrentPage(page)
        } else {
          getProducts(Number(currentPage))
        }
        showSuccess("message.actions.success.delete_banner")
      })
      .catch(() => {
        showError("message.actions.error.delete_banner")
      })
  }

  const handleUpdateData = (data: IProduct) => {
    const newProducts = [...products!.list]
    const index = newProducts.findIndex((item) => item.id === data.id)
    newProducts.splice(index, 1, data)
    if (products) {
      setProducts({
        ...products,
        list: [...newProducts],
      })
    }
  }

  const handleChangeCategory = useCallback((id: number | undefined) => {
    setFilterId(id)
  }, [])

  const handleChangeSort = useCallback((sort: string) => {
    const slug =
      dataSortProduct.find((data) => data.action === sort)?.slug || ""
    setSortId(sort)
    if (!sort) {
      searchParams.delete("sort")
      setSearchParam(searchParams)
      return
    }
    setQueries("sort", slug)
  }, [])

  const handleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setQueries("query", value.trim())
    setQueries("page", "1")
    setCurrentPage(1)
    setSearchQuery(value)
  }, [])

  return {
    products,
    handleDelete,
    handleUpdateData,
    loading,
    handleChangeCategory,
    totalPages,
    currentPage,
    setCurrentPage,
    handleChangeSort,
    sortId,
    querySearch,
    handleSearch,
  }
}
