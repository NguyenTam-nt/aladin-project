import { getDate } from "@commons/index";
import { TranslateContext } from "@contexts/Translation";
import { subjectService } from "@services/subject";
import type { ISubject } from "@typeRules/subject";
import React, { useContext, useEffect, useState } from "react";
import {  useSearchParams } from "react-router-dom";



const ContentNews = () => {
  const [news, setNews] = useState<ISubject>();
  const [searchParam] = useSearchParams();

  useEffect(() => {
    if (searchParam.get("id")) {
      subjectService.getCadresById(searchParam.get("id")|| "").then((news) => {
        setNews(news);
      });
    }
  }, [searchParam]);

  const { t, isVn } = useContext(TranslateContext);
  return news ? (
    <div className="flex flex-1 flex-col">
      <p className="mt-[32px] text-_24 xl:text-_40  font-semibold text-text_primary line-clamp-4">
        {isVn ? news?.title : news?.titleKo}
      </p>
      <p className="text-_14  font-normal mt-1 text-text_secondary ">
        {t("common.create_day") + ": " + getDate(news?.createdDate || "")}
      </p>
      <div className="h-[1px] bg-bg_7E8B99 my-1 "></div>
      <div
        className="text-_14 text-_text-primary text-justify mt-[24px]"
        dangerouslySetInnerHTML={{
          __html: isVn ? news!.content : news!.contentKo,
        }}
      />
   
    </div>
  ) : (
    <></>
  );
};

export default ContentNews;
