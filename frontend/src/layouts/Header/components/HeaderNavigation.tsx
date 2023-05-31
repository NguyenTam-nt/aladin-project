import React, { useContext } from "react";
import { TranslateContext } from "@contexts/Translation";
import { Link } from "react-router-dom";
import { ICArrowDown } from "@assets/icons/ICArrowDown";
import { ICMenu } from "@assets/icons/ICMenu";
import { paths } from "@constants/router";
import clsx from "clsx";
import { useGetHeader } from "./useGetHeader";

export const HeaderNavigation = () => {

  const {isVn} = useContext(TranslateContext)
  const {headers} = useGetHeader()
  return (
    <div className="h-[60px] flex justify-between items-center">
      {headers.slice(0, 5).map((item, index) => {
        const subNews = item?.items ?? []
        return  (
          <div key={index} className={clsx({ "header-subnav": item?.items?.length })}>
            <HeaderNavigationLink
              to={item.link ?? ""}
              text={`${isVn ? item.name : item.nameKo}`} 
              withArrow={subNews.length > 0}
            />
            {item?.items && item?.items.length ? (
              <div
                className="header-subnav-child shadow-lg"
                style={{
                  ["--length-subnav" as string]:  subNews?.length,
                }}
              >
                <ul>
                  {subNews.map((_item, indexSub) => {
                    return  (
                        (<li key={indexSub}>  
                        <HeaderSubNavigationLink
                          to={`${item.link}${ _item.link ? item.link === paths.news.prefix ? `?type=${_item.link}` : `/${_item.link}` : ""}`}
                          text={`${isVn ? _item.name : _item.nameKo}`} 
                        />
                      </li> )
                    );
                  })}
                </ul>
              </div>
            ) : null }
          </div>
        )
      })}

      <div className="header-subnav cursor-pointer">
        <ICMenu />
        <div
          className="header-subnav-child shadow-lg right-0"
          style={{
            ["--length-subnav" as string]: headers.slice(5).length
          }}
        >
          <ul>
            {headers.slice(5).map((item, index) => {

              return  (
                <li key={index}>
                  <HeaderSubNavigationLink
                    to={`${item?.link}`}
                    text={`${isVn ? item?.name : item?.nameKo}`} 
                  />
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

const HeaderNavigationLink = ({
  withArrow = false,
  text,
  to
}: {
  withArrow?: boolean;
  text: string;
  to: string;
  withSlash?: boolean;
}) => {
  const { t } = useContext(TranslateContext);
  
  return (
    <>
      <div className="flex items-center">
        <Link className="text-[16px] text-text_secondary" to={to}>
          {t(text)}
        </Link>
        {withArrow && (
          <div className="ml-1">
            <ICArrowDown />
          </div>
        )}
        {/* {withSlash && <div className="w-[1px] h-[16px] bg-br_E9ECEF mx-[31px]" />} */}
      </div>
    </>
  );
};

export const HeaderSubNavigationLink = ({
  text,
  to,
}: {
  withArrow?: boolean;
  text: string;
  to: string;
  withSlash?: boolean;
}) => {

  const { t } = useContext(TranslateContext);
  return (
    <>
      <Link
        className="text-text_primary leading-[28px] h-[60px] p-[16px] text-_16 font-semibold duration-300 py-2  relative z-[1] w-full flex items-center"
        to={to}
      >
        {t(text)}
      </Link>
    </>
  );
};
