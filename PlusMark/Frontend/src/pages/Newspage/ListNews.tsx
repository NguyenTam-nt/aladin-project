
import { useEffect, useMemo } from "react";
import { newsData, NewsState } from "./Banner";
import NewsItem from "@components/News/Item/NewsItem";
import Pagination2 from "@components/Pagination/Pagination2";
// import { useTranslation } from "react-i18next"
// import { useAppDispatch, useAppSelector } from "../../hooks/hook";
// import { getNews, setCurrentPage } from "../../reducers/news";

const LIMIT = 10

export default function ListNews() {


    // const dispatch = useAppDispatch();
    // const newsData = useAppSelector(state => state.newsSlice); 
    // const translate = useAppSelector(state => state.translateSlice)

    // useEffect(() => {
    //     dispatch(getNews({
    //         page: newsData.currentPage,
    //         limit: LIMIT
    //     }))
    // }, [newsData.currentPage])

    // const total = useMemo(()=> {
    //     return Math.ceil(newsData.total/LIMIT);
    // }, [newsData.total])

    // const [t] = useTranslation();

    const total = 3;

    return (
        <>
            <h2 className="lg:py-[56px] leading-normal md:py-[26px] py-[18px] text-main text-[18px] md:text-[48px] font-bold text-center  bg-white">
                {/* {t("news.title")} */}
                TIN TỨC TỔNG HỢP
            </h2>
            <div className="px-4 sm:px-0 bg-[#F2F4F1] lg:bg-white pt-[24px] ">
               
               <div className="container grid grid-cols-1 lg:grid-cols-2 text-text-gray xl:gap-x-9 w-1920:gap-x-[45px] ">
                {
                    newsData.newsList.length > 0 ? 
                    newsData.newsList.map((news) => {
                        return  <NewsItem key={news.id} news={news} />
                    })
                    : 
                    // <div className="h-[300px] flex justify-center items-center w-full col-span-2">{translate.isEnglish ? "Không có dữ liệu" : "No thing"}</div>
                    <div className="h-[300px] flex justify-center items-center w-full col-span-2">Không có dữ liệu</div>
                }
               </div>

               <div className="container pb-[50px] lg:pt-[50px]">
                   {/* <Pagination currenPage={newsData.currentPage} setCurrentPage={setCurrentPage} total={total} /> */}
                   <Pagination2 currenPage={newsData.currentPage} setCurrentPage={(page) => 0} total={total} />
                </div>
            </div>
        </>
    )
}