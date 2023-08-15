import { useEffect, useState } from "react";
import NewsDetail from "./NewsDetail";
import RelatedNews from "./RelatedNews";
import { Link, useNavigate, useParams } from "react-router-dom";
import { newsData } from "@pages/Newspage/Banner";
import { some } from "@utility/helper";
import BreakCrumb, { BreadcrumbType } from "@components/Breadcrumb";
import NewsServices from "@services/NewsServices";
import LoadingPage from "@components/LoadingPage";


export default function DetailNews() {

  const breakcrumData = [
    {
        name: "Trang chủ",
        clickable: true,
        active: false,
        link: "/"
    },
    {
        name: "Về Supershop",
        clickable: true,
        active: false,
        link: "/about-us"
    },
    {
        name: "Tin tức",
        clickable: true,
        active: false,
        link: "/about-us/news"
    }
  ]

  const breakcrumDataMobile = [
    {
        name: "Trang chủ",
        clickable: true,
        active: false,
        link: "/"
    },
    {
        name: "Tin tức",
        clickable: true,
        active: false,
        link: "/about-us/news"
    }
  ]

    const [news, setNews] = useState<some>()
    const [lastBreakCrumb, setlastBreakCrumb] = useState<BreadcrumbType>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const param = useParams();
    const navigate = useNavigate();
    useEffect(()=> {
        try {
            setIsLoading(true)
            fetchData(param.id)
              .then(data => {
                setIsLoading(false)
                setNews(data.data)
                setlastBreakCrumb({
                  name: data.data.title,
                  clickable: false,
                  active: true,
                  link: ""
                })
              }).catch(e => {
                setIsLoading(false)
              })
        } catch (error) {
            setIsLoading(false)
        }
        
    }, [param, param.id])
    
    const fetchData = async (id: any) => {
      return  await NewsServices.getById(id)
    }
    

    return (
    !isLoading ?  <> 
        <div className="flex lg:hidden h-9 items-center absolute top-0 left-4 right-4">
            <BreakCrumb data={breakcrumDataMobile} lastData={lastBreakCrumb} normalClass="text-wap-regular2" activeClass=" line-clamp-1 font-semibold " />
        </div>
        <div className="lg:container bg-white" >
            <div className="hidden lg:block mb-4 py-3 px-5 bg-background-300 rounded-md ">
                <BreakCrumb data={breakcrumData} lastData={lastBreakCrumb} normalClass="" activeClass="w-[35%] line-clamp-1 font-semibold" />
            </div>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1 mb-4 lg:mb-0">
                    {news && <NewsDetail news={news} />}
                </div>
                <div  className="hidden lg:block w-[30%]">
                    <RelatedNews />
                </div>
            </div>
        </div> </> : <div className="h-48 min-h-full w-full flex justify-center items-center">
        <LoadingPage /> 
    </div>
    )


}

