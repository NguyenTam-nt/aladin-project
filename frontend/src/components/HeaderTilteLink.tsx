import { ICArrowDown } from "@assets/icons/ICArrowDown";
import { withResponsive } from "@constants/container";
import { rootRouter } from "@constants/router";
import { TranslateContext } from "@contexts/Translation";
import useWindowResize from "@hooks/useWindowResize";
import clsx from "clsx";
import React, { useContext, useMemo, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

export const HeaderTilteLink = () => {
  const params = useLocation();
  const [querys] = useSearchParams()

  console.log({querys: querys.get("type")})

  const rootPath = useMemo(() => {
    const query = params.pathname.split("/")[1];
    return rootRouter.find((item) => item.path === `/${query}`) 
  }, [params.pathname])

  const subNavs = useMemo(() => {
    return rootPath?.subNavs ?? [];
  }, [rootPath]);

  const subQuery = useMemo(() => {
    const query = params.pathname.split("/");
    const typeQuery = querys.get("type")
    if(!typeQuery) {
        if (query.length === 2 && subNavs && subNavs.length) {
          return subNavs.find((item) => item.path === "");
        } else if (subNavs.length > 2) {
          return subNavs.find((item) => item.path === query[2]);
      }
    }else {
      return subNavs.find((item) => item.path === typeQuery);
    }

    return undefined;
  }, [subNavs, params.pathname, querys]);

  return (
    <HeaderTitle
      prefix={params.pathname.split("/")[1]}
      title={subQuery?.name ?? ""}
      listLink={subNavs.filter((item) => (item.path !== subQuery?.path && !item?.isDetail))}
      isQuery={rootPath?.isHidenRouter}
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
  listLink: {
    path: string;
    name: string;
  }[];
};

const HeaderTitle = ({ title, listLink, prefix, isQuery }: Props) => {
  const { t } = useContext(TranslateContext);
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
        <NewTextOptions path={`/${prefix}${item.path ? isQuery ? `?type=${item.path}` : `/${item.path}` : ""}`} key={index} title={item.name} />
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
                <li key={index} className="h-[32px] w-[200px] flex items-center border-b-[1px] border-solid border-br_E9ECEF px-[16px]">
                  <Link
                    to={`/${prefix}${item.path ? isQuery ? `?type=${item.path}` : `/${item.path}` : ""}`}
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
};
