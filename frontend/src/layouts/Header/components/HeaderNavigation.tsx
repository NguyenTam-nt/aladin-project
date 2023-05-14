import React, { useContext } from "react";
import { TranslateContext } from "@contexts/Translation";
import { Link } from "react-router-dom";
import { ICArrowDown } from "@assets/icons/ICArrowDown";
import { ICMenu } from "@assets/icons/ICMenu";
import { rootRouter } from "@constants/router";
import clsx from "clsx";

export const HeaderNavigation = () => {
  return (
    <div className="h-[60px] flex justify-between items-center">
      {rootRouter.slice(0, 5).map((item, index) => {
        const subNews = item?.subNavs?.filter(_item => !_item.isHiden) ?? []
        return (
          <div key={index} className={clsx({ "header-subnav": item?.subNavs })}>
            <HeaderNavigationLink
              to={item.path}
              text={item.name ?? ""} 
              withArrow={!!item?.subNavs}
            />
            {item?.subNavs && (
              <div
                className="header-subnav-child shadow-lg"
                style={{
                  ["--length-subnav" as string]:  subNews?.length,
                }}
              >
                <ul>
                  {subNews.map((_item, indexSub) => {
                    return (
                     !_item?.isHiden && (<li key={indexSub}>
                        <HeaderSubNavigationLink
                          to={`${item.path}${ _item.path ? `/${_item.path}` : ""}`}
                          text={_item.name ?? ""}
                        />
                      </li> )
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        );
      })}

      <div className="header-subnav cursor-pointer">
        <ICMenu />
        <div
          className="header-subnav-child shadow-lg right-0"
          style={{
            ["--length-subnav" as string]: rootRouter.slice(5).length,
          }}
        >
          <ul>
            {rootRouter.slice(5).map((item, index) => {
              return (
                <li key={index}>
                  <HeaderSubNavigationLink
                    to={item.path}
                    text={item.name ?? ""}
                  />
                </li>
              );
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
  to,
  withSlash = true,
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

const HeaderSubNavigationLink = ({
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
