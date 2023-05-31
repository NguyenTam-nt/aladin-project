import { GetFileType } from "@commons/getTypeFile";
import { TranslateContext } from "@contexts/Translation";
import { cadresService } from "@services/cadres";
import type { ICadres } from "@typeRules/cadres";
import FileSaver from 'file-saver';
import React, { useContext, useEffect, useState } from "react";
import {  useSearchParams } from "react-router-dom";



const ContentNews = () => {
  const [news, setNews] = useState<ICadres>();
  const [searchParam] = useSearchParams();


  useEffect(() => {
    if(searchParam.get("id")) {
      cadresService.getCadresById(searchParam.get("id") || "0").then((news) => {
        console.log("news" ,news);
        
        setNews(news);
      });
    }
   
  }, [searchParam]);

  console.log("news news news" ,news);
  

  const { t, isVn } = useContext(TranslateContext);
  return news ? (
    <div className="flex flex-1 flex-col mt-[84px]">
      <div className="flex flex-col xl:flex-row">
        <img
          className="h-[401px] w-[312px] object-cover"
          src={news.files[0].link}
        ></img>
        <div className="flex flex-col ml-[24px]">
          <div className="flex flex-row   items-center">
            <span className=" text-secondary">{isVn ? news.position : news.positionKo}</span>
            <div className=" ml-[16px] h-[1px] w-[30%] text-_18 bg-black "></div>
          </div>
          <div>
            <p className="text-_32 mt-[24px]">{isVn ? news.fullname : news.fullnameKo}</p>
          </div>
          <div className="mt-[24px]">
            <p className="text-_18 font-semibold ">
              {t("cadres_manage._form_create._specialized._name")}
            </p>
            <p className="text-_14 mt-[8px]">{isVn ? news.major : news.majorKo}</p>
          </div>
          <div className="mt-[24px]">
            <p className="text-_18 font-semibold ">
              {t("cadres_manage._form_create._job._name")}
            </p>
            <p className="text-_14 mt-[8px]">{isVn ? news.workResponsibility : news.workResponsibilityKo}</p>
          </div>
          <div className="mt-[24px]">
            <p className="text-_18 font-semibold ">
              {t("_about._structure._contact")}
            </p>
            <p className="text-_14 mt-[8px]">{news.email}</p>
          </div>
        </div>
      </div>
      <p className="mt-[32px] text-_24 xl:text-_40  font-semibold text-text_primary line-clamp-4">
        {isVn ? news?.title : news?.titleKo}
      </p>
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
            console.log(file);

            const onPress = () => {
              FileSaver.saveAs(`${file.link}`, file.name);
            };
            return (
              <div key={file.id}>
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
