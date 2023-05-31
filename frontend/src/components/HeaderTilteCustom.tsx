import { ICArrowDown } from "@assets/icons/ICArrowDown";
import { Colors } from "@constants/color";
import { withResponsive } from "@constants/container";
import { rootRouter } from "@constants/router";
import { TranslateContext } from "@contexts/Translation";
import useWindowResize from "@hooks/useWindowResize";
import clsx from "clsx";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";


export type PropsHeader = {
  prefix: string;
  title: string;
  isQuery?: boolean
  listLink: ListLinkItem[] ,
  isChildren? : boolean
};

type TitleProps = {
  path: string;
  title: string;
  active : boolean;
};

type ListLinkItem = {
  path?: string;
  name: string;
  children?: PropsLisLink[];
  parent?: number;
  id: number;
  nameKo : string
};

type PropsLisLink = {
  id: number;
  name: string;
  nameKo: string;
  
  status?: boolean;
  parent: number;
};



const NewTextOptions = ({ title, path, active  }: TitleProps) => {
  const { t } = useContext(TranslateContext);
  return (
    <Link
      to={path}
      className="ml-[16px] xl:ml-[24px] text-text_primary text-_14 xl:text-_18  font-semibold line-clamp-1"
      style={{
        fontWeight: active ? "bold" : "normal",
        color : active ?  Colors.secondary : Colors.text_primary
      }}
    >
      {t(title)}
    </Link>
  );
};

export const HeaderTilteCustom = ({ title, listLink, prefix, isQuery ,isChildren }: PropsHeader) => {


  const [titleLeft , setTitleLeft] = useState("")
  const [listLinkRight, setListLinkRight] = useState<ListLinkItem[]>([]);
  const [searchParam] = useSearchParams();
  const { t , isVn } = useContext(TranslateContext);
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

  useEffect(() => {
    if (!searchParam.get("type")) {
      setTitleLeft(title);
      setListLinkRight(listLink || []);
    } else {
      setTitleLeft(
        isVn
          ? listLink.find(
              (item) =>
                item.path && item.path.toString() === searchParam.get("type")
            )?.name || ""
          : listLink.find(
              (item) =>
                item.path && item.path.toString() === searchParam.get("type")
            )?.nameKo || ""
      );
      setListLinkRight(
        listLink.find(
          (item) =>
            item.path && item.path.toString() === searchParam.get("type")
        )?.children || []
      );
    }
  }, [listLink, searchParam, title, isChildren]);

  return (
    <div className="w-rp flex flex-1 flex-row  items-center   mt-[40px] xl:mt-[94px]">
      <p className="text-_24 font-semibold xl:text-_40 xl:font-bold text-text_primary mr-[24px] line-clamp-1">
        {titleLeft}
      </p>
      <div className="h-[2px]  bg-bg_7E8B99 flex-1"></div>
      {listLinkRight.slice(0, limitSlice).map((item) => {
        const active = searchParam.get("id") === item.id.toString();

        return (
          <NewTextOptions
            path={
              isChildren
                ? `/${prefix}?id=${item.id}`
                : `/${prefix}${
                    item.path
                      ? isQuery
                        ? `?type=${item.path}`
                        : `/${item.path}`
                      : item.parent
                      ? `?type=${item.parent}&id=${item.id}`
                      : ""
                  }`
            }
            active={active}
            key={item.id}
            title={isVn ? item.name : item.nameKo}
          />
        );
      })}
      {listLinkRight.length >= limitSlice + 1 ? (
        <div
          className="flex items-center relative cursor-pointer"
          onClick={handleShow}
        >
          <span className="ml-[16px] xl:ml-[24px] text-text_primary text-_14 xl:text-_18  font-semibold">
            {t("common._other")}
          </span>
          <ICArrowDown />
          <ul
            className={clsx(
              "z-[10] overflow-hidden h-0 ease-in duration-300 absolute bg-white top-[100%] right-0 shadow-lg",
              { "footer-animation-list": isShow }
            )}
            style={{
              ["--footer-size" as string]: listLink.slice(limitSlice).length,
              ["--height-li" as string]: "32px",
            }}
          >
            {listLink.slice(limitSlice).map((item, index) => {
                     const active = searchParam.get("id") === item.id.toString();
              return (
                <li
                  key={index}
                  className="h-[32px] w-[200px] flex items-center border-b-[1px] border-solid border-br_E9ECEF px-[16px]"
                >
                  <Link
                    to={`/${prefix}${
                      isChildren
                        ? `?id=${item.path}`
                        : item.path
                        ? isQuery
                          ? `?type=${item.path}`
                          : `/${item.path}`
                        : ""
                    }`}
                    className="text-_14 xl:text-_18 hover:text-primary duration-300 w-auto line-clamp-1"
                    style={{
                      fontWeight: active ? "bold" : "normal",
                      color : active ?  Colors.secondary : Colors.text_primary
                    }}
                  >
                    {isVn ? item.name : item.nameKo}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
};
