import { ICArrowDown } from '@assets/icons/ICArrowDown';
import { prefixRootRoute } from '@configs/index';
import { TranslateContext } from '@contexts/Translation';
import clsx from 'clsx';
import React, { useContext, useState } from 'react'
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import type { IRouterAmin } from '@constants/routerAdmin';
import { Colors } from '@constants/color';
import { SidebarAdminSubItem } from './SidebarAdminSubItem';

type Props = {
    data: IRouterAmin;
  };
  

export const SidebarAdminItem = ({ data }: Props) => {
    const [isShow, setIsShow] = useState(false);
    const { t } = useContext(TranslateContext);
    const handleShow = () => {
      setIsShow(!isShow);
    };
    const resolved = useResolvedPath(`${prefixRootRoute.admin}/${data.path}`);
    const match = useMatch({ path: resolved.pathname, end: false });
  
    return (
      <div
        className={clsx(
          "h-auto border-solid text-_16 text-text_primary px-[29px] border-l-[4px] border-transparent",
          { "!border-secondary": !!match }
        )}
        style={{
          ["--footer-size" as string]: data.subNavs?.length ?? 0,
          ["--height-li" as string]: "32px",
        }}
      >
        <div
          className={clsx(
            "relative  h-[60px] items-center  flex justify-between")}
        >
          <Link
            to={`${prefixRootRoute.admin}/${data.path}`}
            className="flex items-center"
          >
            <div className="w-[24px] flex justify-center">
              <data.icon
                color={!!match ? Colors.secondary : Colors.text_primary}
              />
            </div>
            <div
              className={clsx("block ml-[16px]", {
                "text-secondary font-bold": !!match && !data.subNavs,
              })}
            >
              {t(data.name)}
            </div>
          </Link>
          {!!data.subNavs ? (
            <div
              className={clsx(" cursor-pointer duration-300 ease-linear ", {
                "rotate-180": isShow,
              })}
              onClick={handleShow}
            >
              <ICArrowDown />
            </div>
          ) : null}
        </div>
        {!!data.subNavs ? (
          <ul
            className={clsx(
              "block h-0 overflow-hidden relative top-[-10px] duration-300  ease-linear",
              { "footer-animation-list": isShow }
            )}
          >
            {data.subNavs.map((_item, index) => {
              return (
                <SidebarAdminSubItem
                  index={index}
                  path={`${prefixRootRoute.admin}/${data.path}${
                    _item.path ? `/${_item.path}` : ""
                  }`}
                  name={_item.name}
                />
              );
            })}
          </ul>
        ) : null}
      </div>
    );
  };
  