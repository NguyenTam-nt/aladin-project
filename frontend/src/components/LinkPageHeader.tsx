import { withResponsive } from "@constants/container";
import { rootRouter } from "@constants/router";
import { TranslateContext } from "@contexts/Translation";
import useWindowResize from "@hooks/useWindowResize";
import clsx from "clsx";
import React, { useContext, useMemo } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

export const LinkPageHeader = () => {
  const { t } = useContext(TranslateContext);
  const { width } = useWindowResize();
  const params = useLocation();
  const [searchParams] = useSearchParams()
  const listLink = useMemo(() => {
    let result = [];
    const list = params.pathname.split("/");
    if (list.length >= 2) {
      const rootLink = rootRouter.find((item) => item.path === `/${list[1]}`);
      result.push({
        name: rootLink?.name,
        path: rootLink?.path,
      });
      if(!rootLink?.isHidenRouter) {
        if (list.length === 2) {
          if (rootLink?.subNavs) {
            let rootl = rootLink?.subNavs.find((item) => item.path === "");
            if (rootl) {
              result.push({
                name: rootl?.name,
                path: rootl?.path,
              });
            }
          }
          return result;
        }
  
        if (list.length >= 3) {
          list.slice(2).forEach((_item) => {
            if (rootLink?.subNavs) {
              let rootl = rootLink?.subNavs.find((item) => item.path === _item);
              result.push({
                name: rootl?.name,
                path: rootl?.path,
              });
            }
          });
        }
      }else {
          const query = searchParams.get("type")
          if(query) {
            const parentQuery = rootLink.subNavs?.find(item => item.path === query)
            result.push({
              name: parentQuery?.name,
              path: parentQuery?.path,
              isQuery: true
            });
          }else if(list.length > 2) {
            const linkRoor = rootRouter.find(item => item.path === params.pathname)
            result.push({
              name: linkRoor?.name,
              path: linkRoor?.path,
              isDetail: true
            });
          }
      }
    }
    return result;
  }, [params.pathname, searchParams]);
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
                  to={`${listLink[0].path}`}
                  className={clsx({
                    "opacity-70": index < listLink.length - 1,
                    "font-bold opacity-100": index === listLink.length - 1,
                  })}
                >
                  {t(item.name)}
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
                {t(item.name)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  ) : null
};
