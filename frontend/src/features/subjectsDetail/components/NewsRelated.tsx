import { getDate } from "@commons/index";
import TagNews from "@components/TagNews";
import { paths } from "@constants/router";
import { TranslateContext } from "@contexts/Translation";
import { subjectService } from "@services/subject";
import type { ISubject } from "@typeRules/subject";
import React, { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";



const RelatedItem = React.memo(({ item } : { item : ISubject}) => {
  const {t ,isVn} = useContext(TranslateContext)
  const navigatonToDetail = `${paths.news.prefix}/${paths.news.detail}`
  return (
    <Link to={navigatonToDetail + `?id=${item.id}`} className="flex flex-row bg-bg_FAFAFA  mt-[16px]">
      <div className=" h-[128px] w-[96px]">
        <img
          className="w-full h-full object-cover"
          src={item.files![0].link}
        ></img>
      </div>
      <div className=" mx-[24px] mt-[16px] flex-1">
        <TagNews title={isVn ? item.name : item.nameKo}></TagNews>
        <p className=" text-_18 font-bold leading-[32px] text-text_black  mt-[10px] line-clamp-1">
         {isVn ? item.title : item.titleKo}
        </p>
        <p className=" text-_14 text-text_black mt-[8px]">
          {t("common.create_day") + " :"} {getDate(item.createdDate || "")} 
        </p>
      </div>
    </Link>
  );
});



const NewsRelated = () => {

  const { t } = useContext(TranslateContext);
  const [related , setRelated] = useState<ISubject[]>([])

  const [searchParam] = useSearchParams()

  useEffect(() => {
    subjectService.get({ page: 0, size: 4 }).then((news) => {
       setRelated(news.data.filter(item => item.id !== Number(searchParam.get("id"))));
    });
  }, [searchParam]);

  return (
    <div>
      <p className=" text-_24 xl:text-_40  font-semibold text-text_primary mb-[24px] xl:mb-[56px] mt-[40px] xl:mt-[0px]">
        {t("common._newRelated")}
      </p>
      {related.slice(0,3).map((item, index) => (
        <RelatedItem item={item} key={index}></RelatedItem>
      ))}
    </div>
  );
};

export default NewsRelated;
