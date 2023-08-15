import { Logo } from "@assets/icons";
import BreakCrumb, { BreadcrumbType } from "@components/Breadcrumb";
import LoadingPage from "@components/LoadingPage";
import useI18n from "@hooks/useI18n";
import IntroServices from "@services/IntroServices";
import convertToHtml from "@utility/convertoHtml";
import React, { useEffect, useState } from "react";

export const Intropage = () => {

  const {t} = useI18n()

  const [content, setcontent] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const breakcrumData: BreadcrumbType[] = [
    {
      name: "Trang chủ",
      clickable: true,
      active: false,
      link: "/"
    },
    {
      name: "Giới thiệu",
      clickable: false,
      active: true,
      link: "/"
    }
  ]

  useEffect(() => {
    try {
      setIsLoading(true)
      fetchData()
        .then(data => {
          // console.log(data.data.data)
          setcontent(data.data.content)
          setIsLoading(false)
        }).catch(e => {
          setIsLoading(false)
        })

    } catch (error) {
      setIsLoading(false)
      console.log(error);
    }
    
  }, [])
  
  const fetchData = async () => {
    return  await IntroServices.get()
  }


  return (
    <>
      <div className="flex lg:hidden h-9 items-center absolute top-0">
        <BreakCrumb data={breakcrumData} normalClass="text-wap-regular2" activeClass="flex-1 line-clamp-1 font-semibold" />
      </div>
      <div className="w-full">
        <h3 className="hidden lg:block text-title font-bold text-black">{t("about_us.introduce_title")}</h3>
        <div className="h-[105px] flex justify-center mx-8">
          <Logo className="h-full w-auto"/>
        </div>
        {
          !isLoading ? 
            <p className="my-8 leading-tight myEditor"
              dangerouslySetInnerHTML={{__html: content && convertToHtml(content) }}
            ></p> : <div className="h-48 min-h-full w-full flex justify-center items-center">
            <LoadingPage /> 
          </div>
        }
      </div>
    </>
  );
};
