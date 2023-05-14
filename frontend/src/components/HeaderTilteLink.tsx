import { ICArrowDown } from "@assets/icons/ICArrowDown";
import { withResponsive } from "@constants/container";
import { rootRouter } from "@constants/router";
import { TranslateContext } from "@contexts/Translation";
import useWindowResize from "@hooks/useWindowResize";
import clsx from "clsx";
import React, { useContext, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const HeaderTilteLink = () => {
  const params = useLocation();

  const subNavs = useMemo(() => {
    const query = params.pathname.split("/")[1];
    return rootRouter.find((item) => item.path === `/${query}`)?.subNavs ?? [];
  }, [params.pathname]);

  const subQuery = useMemo(() => {
    const query = params.pathname.split("/");
    if (query.length === 2 && subNavs && subNavs.length) {
      return subNavs.find((item) => item.path === "");
    } else if (subNavs.length > 2) {
      return subNavs.find((item) => item.path === query[2]);
    }

    return undefined;
  }, [subNavs, params.pathname]);

  return (
    <HeaderTitle
      prefix={params.pathname.split("/")[1]}
      title={subQuery?.name ?? ""}
      listLink={subNavs.filter((item) => item.path !== subQuery?.path)}
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
    <Link to={path} className="ml-[16px] xl:ml-[24px] text-text_primary text-_14 xl:text-_18  font-semibold">
      {t(title)}
    </Link>
  );
};

type Props = {
  prefix: string;
  title: string;
  listLink: {
    path: string;
    name: string;
  }[];
};

const HeaderTitle = ({ title, listLink, prefix }: Props) => {
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

  console.log(listLink.slice(limitSlice).length)

  return (
    <div className="w-rp flex flex-1 flex-row  items-center mt-[40px] xl:mt-[94px]">
      <p className="text-_24 font-semibold xl:text-_40 xl:font-bold text-text_primary mr-[24px]">
        {t(title)}
      </p>
      <div className="h-[2px]  bg-bg_7E8B99 flex-1"></div>
      {listLink.slice(0, limitSlice).map((item, index) => (
        <NewTextOptions path={`/${prefix}${item.path ? `/${item.path}` : ""}`} key={index} title={item.name} />
      ))}
      {listLink.length >= limitSlice + 1 ? (
        <div className="flex items-center relative cursor-pointer" onClick={handleShow}>
          <span className="ml-[16px] xl:ml-[24px] text-text_primary text-_14 xl:text-_18  font-semibold">
            {t("common._other")}
          </span>
          <ICArrowDown />
          <ul
            className={clsx("w-[150px]  overflow-hidden h-0 ease-in duration-300 absolute top-[100%] right-0 shadow-lg",{ "footer-animation-list": isShow })}
            style={{
              ["--footer-size" as string]: listLink.slice(limitSlice).length,
              ["--height-li" as string]: "32px",

            }}
          >
            {listLink.slice(limitSlice).map((item, index) => {
              return (
                <li key={index} className="h-[32px] flex items-center border-b-[1px] border-solid border-br_E9ECEF px-[16px]">
                  <Link
                    to={`/${prefix}/${item.path ? `/${item.path}` : ""}`}
                    className="text-[14px] hover:text-primary duration-300 w-auto line-clamp-1"
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
