import { withResponsive } from "@constants/container";
import { rootRouter } from "@constants/router";
import { TranslateContext } from "@contexts/Translation";
import useWindowResize from "@hooks/useWindowResize";
import clsx from "clsx";
import { useGetHeader } from "layouts/Header/components/useGetHeader";
import React, { useContext, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

export const LinkPageHeader = () => {
  const { t, isVn } = useContext(TranslateContext);
  const { width } = useWindowResize();
  const params = useLocation();
  const {headers} = useGetHeader()
  const listLink = useMemo(() => {
    let result = [];
    const list = params.pathname.split("/");
    if (list.length >= 2) {
      const rootLink = headers.find((item) => item.link === `/${list[1]}`);
      result.push({
        ...rootLink
      });
      // if(!rootLink?.isHidenRouter) {
        if (list.length === 2) {
          if (rootLink?.items?.length) {
            let rootl = rootLink?.items.find((item) => !item.link);
            if (rootl) {
              result.push({
                ...rootl
              });
            }
          }
          return result;
        }
  
        if (list.length >= 3) {
          list.slice(2).forEach((_item) => {
            if (rootLink?.items) {
              let rootl = rootLink?.items.find((item) => item.link === _item);
              if(rootl) {
                result.push({
                  ...rootl
              });

              }
            }
          });
        }
      // }else {
      //     const query = searchParams.get("type")
      //     if(query) {
      //       const parentQuery = rootLink.subNavs?.find(item => item.path === query)
      //       result.push({
      //         name: parentQuery?.name,
      //         path: parentQuery?.path,
      //         isQuery: true
      //       });
      //     }else if(list.length > 2) {
      //       const linkRoor = rootRouter.find(item => item.path === params.pathname)
      //       result.push({
      //         name: linkRoor?.name,
      //         path: linkRoor?.path,
      //         isDetail: true
      //       });
      //     }
      // }
    }
    return result;
  }, [headers, params.pathname]);
  return width >= withResponsive._1280 ? (
    <div className="w-rp mt-[14px] hidden xl:block">
      <div className="flex text-[18px] font-normal text-text_primary ">
        <Link to={rootRouter[0].path} className="opacity-70">
          {t(rootRouter[0].name)}
        </Link>
        {listLink?.map((item, index) => {
          if (index === 0)
            return (
              <div key={index} className="flex items-center">
                <span className="mx-[8px]">/</span>
                <Link
                  to={`${listLink[0].link}`}
                  className={clsx({
                    "opacity-70": index < listLink.length - 1,
                    "font-bold opacity-100": index === listLink.length - 1,
                  })}
                >
                {isVn ? item?.name : item?.nameKo}
                </Link>
              </div>
            );
          return (
            <div key={index} className="flex items-center">
              <span className="mx-[8px]">/</span>
              <p
                className={clsx({
                  "opacity-70": index < listLink.length - 1,
                  "font-bold opacity-100": index === listLink.length - 1,
                })}
              >
                  {isVn ? item?.name : item?.nameKo}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  ) : null
};
