import { ArrowDownIcon, ArrowDownManageIcon, DeleteIcon } from '@assets/icons'
import Banner from '@components/Banner/Banner'
import BreakCrumb, { BreadcrumbType } from '@components/Breadcrumb'
import ProductCard from '@components/Card/ProductCard'
import LoadingScreen from '@components/LoadingScreen'
import BrandFilter from '@components/filters/brand'
import FilteringItem from '@components/filters/filtering'
import PriceFilter from '@components/filters/price'
import ProductFilter from '@components/filters/product'
import ProductItemFilter from '@components/filters/product-item'
import useI18n from '@hooks/useI18n'
import useViewport from '@hooks/useViewPort'
import BannerServices from '@services/BannerServices'
import CategoryProductServices from '@services/CategoryProductServices'
import ProductServices, { ProductItem } from '@services/ProductServices'
import { BANNERS } from '@utility/constants'
import { some } from '@utility/helper'
import clsx from 'clsx'
import React, { useEffect, useState, useMemo } from 'react'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import LoadingPage from '@components/LoadingPage'

const MIN_PRICE_DEFAULT = 0;
const MAX_PRICE_DEFAULT = 20000000;
const STEP_PRICE_DEFAULT = 100000;
const MIN_DISCOUNT_DEFAULT = 0;
const MAX_DISCOUNT_DEFAULT = 100;

const SIZE_DATA = 20

function SearchPage() {

  const { width } = useViewport()
  const [searchParams, setSearchParams] = useSearchParams()
  const [keywordParam, setKeywordParam] = useState<string>()

  const {t} = useI18n()
  const [productData, setproductData] = useState<ProductItem[]>([])

  const [isLoading, setIsLoading] = useState(false)
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const totalPages = useMemo(() => {
    return Math.ceil(total / SIZE_DATA);
  }, [total]);
  const [bannerProduct, setbannerProduct] = useState<string[]>([])

  useEffect(() => {
    try {
      BannerServices.getBanner(BANNERS.SEARCH)
        .then(data => {
          setbannerProduct(data.images)
        })
    } catch (error) {
    
    }
  }, [])  

  useEffect(() => {
    let keyword = searchParams.get("keyword") || undefined
    if(keyword && keyword.length > 0) {
      setKeywordParam(keyword)
      setIsLoading(true)
      setCurrentPage(0)
      let request = {
        page: 0,
        size: SIZE_DATA,
        keyword:keyword
      }
      callSearchAPI(request)
    }
    
  }, [searchParams])

  const callSearchAPI = (request: any) => {
    ProductServices.searchHeader(request)
      .then(data => {
        setproductData(data.data)
        setTotal(data.total)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const fechData = () => {
    // if(isAll) return
    if (currentPage < totalPages) {
      setIsLoading(true)
      let request = {
        page: currentPage + 1,
        size: SIZE_DATA,
        keyword: keywordParam
      }
      callSearchAPIMore(request)
      setCurrentPage((page) => page + 1);
    } 
  };

  const callSearchAPIMore = (request: any) => {
    ProductServices.searchHeader(request)
      .then(data => {
        setproductData(pre => [...pre, ...data.data])
        setTotal(data.total)
      }) .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className="container px-4 lg:px-8 mb-20" >
      <div className="mt-6">
        <Banner className="h-[50vh]" images={bannerProduct} />
      </div>

      {keywordParam ? 
        <div className="mt-6">
          <h3 className='text-normal2 font-bold'>
            {t("search_page.search")} <span className='text-main'>"{keywordParam}"</span>
          </h3>
          <div className="mt-4 text-normal1">
            {t("search_page.search_res1")} 
            <span className='font-bold'>{total || productData?.length || 0} {t("search_page.search_res2")} </span>
            {t("search_page.search_res3")} 
          </div>
        </div> : <></>
      }

      <InfiniteScroll
          hasMore
          loader={
            isLoading ? (
              <div className="w-full h-24 flex items-center justify-center">
                <LoadingPage />
              </div>
            ) : (
              <></>
            )
          }
          next={fechData}
          dataLength={productData.length}
          // scrollableTarget="comment-admin-scroll"
          className='!overflow-visible'
        >
        <div className="mt-6 grid grid-cols-2 ssm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 lg:gap-4">
          {
            productData && productData.length > 0 && productData.map((item, i) => {
              return <ProductCard product={item} hover key={item.id} />
            })
          }
        </div>
        </InfiniteScroll>

    </div>
  )
}

export default SearchPage