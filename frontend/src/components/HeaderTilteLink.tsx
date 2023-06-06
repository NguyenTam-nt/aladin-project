import { ICArrowDown } from "@assets/icons/ICArrowDown";
import { withResponsive } from "@constants/container";
import { paths } from "@constants/router";
import { TranslateContext } from "@contexts/Translation";
import useWindowResize from "@hooks/useWindowResize";
import type { IHeader } from "@typeRules/footer";
import clsx from "clsx";
import { useGetHeader } from "layouts/Header/components/useGetHeader";
import React, { memo, useContext, useMemo, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

export const HeaderTilteLink = () => {
  const params = useLocation();
  const [querys] = useSearchParams()
  const {isVn} = useContext(TranslateContext) 
  const {headers} = useGetHeader()
  const rootPath = useMemo(() => {
    const query = params.pathname.split("/")[1];
    return headers.find((item) => item.link === `/${query}`) 
  }, [headers, params.pathname])

  const subNavs = useMemo(() => {
    return rootPath?.items?.filter(item => item.status) ?? []
  }, [rootPath]);

 
  

  const subQuery = useMemo(() => {
    const query = params.pathname.split("/");
    const typeQuery = querys.get("type")
    if(!typeQuery) {
        if (query.length === 2 && subNavs && subNavs.length) {
          return subNavs.find((item) => !item.link);
        } else if (subNavs.length > 2) {
          return subNavs.find((item) => item.link === query[2]);
      }
    }else {
      return subNavs.find((item) => item.link === typeQuery);
    }

    return undefined;
  }, [subNavs, params.pathname, querys]);

  return (
    <HeaderTitle
      prefix={params.pathname.split("/")[1]}
      title={ subQuery ? isVn ?  subQuery?.name || "" : subQuery?.nameKo || ""  : isVn ?  rootPath?.name || "" :  rootPath?.nameKo || "" }
      listLink={subNavs.filter(item => item.link !== subQuery?.link)}
      isQuery={rootPath?.link === paths.news.prefix}
    />
  );
};

type TitleProps = {
    path: string
  title: string;
};

const NewTextOptions = ({ title, path}: TitleProps) => {
  const { t } = useContext(TranslateContext);
  return (
    <Link to={path} className="ml-[16px] xl:ml-[24px] text-text_primary text-_14 xl:text-_18  font-semibold line-clamp-1">
      {t(title)}
    </Link>
  );
};

type Props = {
  prefix: string;
  title: string;
  isQuery?: boolean
  listLink: IHeader[]
};

const HeaderTitle = memo(({ title, listLink, prefix, isQuery }: Props) => {
  const { t, isVn } = useContext(TranslateContext);
  const [isShow, setIsShow] = useState(false);
  const { width } = useWindowResize();
  const limitSlice = useMemo(() => {
    return width > withResponsive._1280
      ? 4
      : width > withResponsive._992
      ? 3
      : width > withResponsive._640
      ? 2
      : 1;
  }, [width]);

  const handleShow = () => {
    setIsShow(!isShow);
  };

  return (
    <div className="w-rp flex flex-1 flex-row  items-center   mt-[40px] xl:mt-[94px]">
      <p className="text-_24 font-semibold xl:text-_40 xl:font-bold text-text_primary mr-[24px] line-clamp-1">
        {t(title)}
      </p>
      <div className="h-[2px]  bg-bg_7E8B99 flex-1"></div>
      {listLink.slice(0, limitSlice).map((item, index) => (
        <NewTextOptions path={`/${prefix}${item.link ? isQuery ? `?type=${item.link}` : `/${item.link}` : ""}`} key={index} title={isVn ? item.name || "" : item.nameKo || ""} />
      ))}
      {listLink.length >= limitSlice + 1 ? (
        <div className="flex items-center relative cursor-pointer" onClick={handleShow}>
          <span className="ml-[16px] xl:ml-[24px] text-text_primary text-_14 xl:text-_18  font-semibold">
            {t("common._other")}
          </span>
          <ICArrowDown />
          <ul
            className={clsx("z-[10] overflow-hidden h-0 ease-in duration-300 absolute bg-white top-[100%] right-0 shadow-lg",{ "footer-animation-list": isShow })}
            style={{
              ["--footer-size" as string]: listLink.slice(limitSlice).length,
              ["--height-li" as string]: "32px",

            }}
          >
            {listLink.slice(limitSlice).map((item, index) => {
              return (
                <li
                  key={index}
                  className="h-[32px] w-[200px] flex items-center border-b-[1px] border-solid border-br_E9ECEF px-[16px]"
                >
                  <Link
                    to={`/${prefix}${
                      item.path
                        ? isQuery
                          ? `?type=${item.path}`
                          : `/${item.path}`
                        : ""
                    }`}
                    className="text-_14 xl:text-_18 hover:text-primary duration-300 w-auto line-clamp-1"
                  >
                    {t(item.name)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
})
