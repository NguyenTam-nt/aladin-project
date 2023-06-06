import { GetFileType } from "@commons/getTypeFile";
import { getDate } from "@commons/index";
import { TranslateContext } from "@contexts/Translation";
import { newsService } from "@services/newsService";
import type { INews } from "@typeRules/news";
import FileSaver from 'file-saver';
import React, { useContext, useEffect, useState } from "react";
import {  useSearchParams } from "react-router-dom";



const ContentNews = () => {
  const [news, setNews] = useState<INews>();
  const [searchParam] = useSearchParams();

  useEffect(() => {
    newsService.getNewsById(Number(searchParam.get("id"))).then((news) => {
      setNews(news);
    });
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
      {news.files!.length > 1 ? (
        <div>
          <p className="text-_24 mt-[24px]">{t("news.header._files")}</p>
          {news.files?.slice(1).map((file) => {
            const onPress = () => {
              FileSaver.saveAs(`https://hanquochoc.edu.vn/${file.link}`, file.name);
            }
            return (
              <div
                key={file.id}
              >
                <button
                  onClick={onPress}
                  className="flex flex-row h-[80px] w-[50%] my-[20px]  bg-bg_FAFAFA items-center justify-center"
                >
                  <div> {GetFileType(file, 32)} </div>
                  <p className=" line-clamp-1">{file.name}</p>
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  ) : (
    <></>
  );
};

export default ContentNews;
