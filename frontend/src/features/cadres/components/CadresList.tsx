import { ImageTranslation } from "@components/ImageTranslation";
import { paths } from "@constants/router";
import Pagination from "@features/news/components/Paginnation";
import { cadresService } from "@services/cadres";
import { subjectService } from "@services/subject";
import type { ICadres } from "@typeRules/cadres";
import type { ISubject } from "@typeRules/subject";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";



interface INewsItem  {
  imageUrl : string ,
  name : string ,
  sub : string , 
  navigation : string  ,
  id: number
}


const NewsItem = (props : INewsItem) => {
  const { imageUrl, name, sub ,navigation ,id } = props
  return (
    <Link to={`${navigation}?id=${id}`}>
    <div className="h-[212px] m992:h-[461px]  bg-bg_FAFAFA ">
      <div className=" overflow-hidden h-[212px] m992:h-[461px] relative flex flex-1">
        <ImageTranslation link={imageUrl}></ImageTranslation>
        <div className=" absolute  bottom-0 left-0  bg-bg_0_0_0_003 h-[84px] w-full flex items-center  text-center justify-center">
          <div>
            <p className=" text-_14 xl:text-_16   text-text_white font-bold  leading-[28px] ">{name}</p>
            <p className="text-_12 xl:text-_14 text-text_white ">{sub}</p>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
};


interface CadresListProps {
  type?: boolean
}


const CadresList = (props : CadresListProps ) => {
  const navigatonToDetail = !props.type ?  `${paths.cadres.prefix}/${paths.cadres.detail}` : `${paths.subject.prefix}/${paths.subject.detail}`
  const [searchParam] = useSearchParams();
  const [data , setData] = useState<ICadres[]>([])
  const [dataSubject , setDataSubject] = useState<ISubject[]>([])
  const [currentPage , setCurrentPage] = useState(1)
  const [totalPages , setTotalPages] = useState(0)
  
  const getNewsList = (page: number, id?: string) => {
    if(props.type) {
      subjectService.get({ page: page, size: 8 }).then((news) => {
        setDataSubject(news.data);
        setTotalPages(Math.ceil(news.total / 8));
      });
    }
    else {
    if (id) {
      
      cadresService.getById(id, { page: page, size: 8 }).then((news) => {
        setData(news.data);
        setTotalPages(Math.ceil(news.total / 8));
      });
    } else {
      cadresService.get({ page: page, size: 8 }).then((news) => {
        setData(news.data);
        setTotalPages(Math.ceil(news.total / 8));
      });
    }
  }
  };

  const onChangePage = (page: number) => {
    setCurrentPage(page);
    if (searchParam.get("type")) {
      getNewsList(page - 1, searchParam.get("type") || "0");
      return;
    }
    getNewsList(page - 1);
  };
 
  useEffect(() => {
    onChangePage(1);
  }, [searchParam ,props.type]);

    return (
      <>
        <div className="grid grid-cols-2  m992:grid-cols-4 gap-[24px] mt-[24px]">
          {(!props?.type ? data : dataSubject).map((item) => {
            if ("fullname" in item) {
              return (
                <NewsItem
                  navigation={navigatonToDetail}
                  imageUrl={item.files[0].link}
                  id={item.id}
                  name={item.fullname}
                  sub={item.major}
                  key={item.id}
                />
              );
            } else {
              return (
                <NewsItem
                  navigation={navigatonToDetail}
                  imageUrl={item.files[0].link}
                  id={item.id}
                  name={item.title}
                  sub={item.description}
                  key={item.id}
                />
              );
            }
          })}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </>
    );
};

export default CadresList;
