import React, { useEffect, useMemo, useState } from 'react'
import NewsItem from '@components/News/Item/NewsItem'
import Pagination from '@components/Pagination'
import BreakCrumb, { BreadcrumbType } from '@components/Breadcrumb'
import NewsServices from '@services/NewsServices'
import { some } from '@utility/helper'
import BannerServices from '@services/BannerServices'
import { BANNERS } from '@utility/constants'
import Banner from '@components/Banner/Banner'
import LoadingPage from '@components/LoadingPage'

function NewsPage() {
  const [breakcrumDataMobile, setbreakcrumDataMobile] = useState<BreadcrumbType[]>([
    {
        name: "Trang chủ",
        clickable: true,
        active: false,
        link: "/"
    },
    {
        name: "Tin tức",
        clickable: false,
        active: true,
        link: "/about-us/news"
    }
])
  const [bannerNews, setbannerNews] = useState<string[]>([])
  const [newsData, setNewsData] = useState<some>({})
  const [page, setPage] = useState(1)
  const limit = 5
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    try {

      BannerServices.getBanner(BANNERS.NEWS)
        .then(data => {
          setbannerNews(data.images)
        })
    } catch (error) {
    
    }
  }, [])  

  useEffect(() => {
    try {
      setIsLoading(true)
      fetchData()
        .then(data => {
          // console.log(data.data)
          setNewsData(data.data)
          setIsLoading(false)
          
        })
    } catch (error) {
      setIsLoading(false)
    }
  }, [page])

  const total = useMemo(()=> {
    if(newsData) {
      return Math.ceil(newsData.total / limit);
    }
    return 0;
  }, [newsData.total])

  const fetchData = async () => {
    return  await NewsServices.get({page: page, limit: limit, sort: "desc"})
  }
  

  return (
    <>
      <div className="flex lg:hidden h-9 items-center absolute top-0">
          <BreakCrumb data={breakcrumDataMobile} normalClass="text-wap-regular2" activeClass=" line-clamp-1 font-semibold" />
      </div>
      <div>
          <div className="w-full">
            <div className="w-full">
              
              <Banner className="h-auto lg:h-[50vh]" images={bannerNews} />
            </div>
              {/* <img className='w-full' src="/images/intro/news.png" alt="news" /> */}
          </div>
          <div className="mt-8">
            {
              !isLoading ? 
              <div className="">
                
                <div className="">
                  {
                      newsData && newsData.data && newsData.data.length > 0 ? 
                      newsData.data.map((news:any, i:any) => {
                          return  <NewsItem key={i} news={news} />
                      })
                      : 
                      <div className="">Không có dữ liệu</div>
                  }
                </div>

                <div className="pb-6 lg:py-12 text-background-100">
                  <Pagination currenPage={page} setCurrentPage={setPage} total={total} />
                </div>
              </div> : <div className="h-48 min-h-full w-full flex justify-center items-center">
              <LoadingPage /> 
            </div>
            }
          </div>
      </div>
    </>
  )
}

export default NewsPage