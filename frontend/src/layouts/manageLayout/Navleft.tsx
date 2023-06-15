import { ICGm } from "@assets/icons/ICGm";
import { ICLogoFrame } from "@assets/icons/ICLogoFrame";
import { Colors } from "@constants/color";
import { prefixRootRoute } from "@constants/index";
import { RouterManage } from "@constants/routerManager";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Link,
  NavLink,
  useLocation,
  useMatch,
  useResolvedPath,
} from "react-router-dom";
interface Props {
  item: {
    path: string;
    exact?: boolean;
    name?: string;
    element: any;
    icon?: any;
  };
}
const RenderLink = (props: Props) => {
  const { t } = useTranslation();

  const resolved = useResolvedPath(
    `${prefixRootRoute.admin}/${props.item.path}`
  );
  const match = useMatch({ path: resolved.pathname, end: false });

  return (
    <NavLink
      to={props.item.path}
      // end
      className={({ isActive }) => {
        return (
          " flex gap-[10px] border-l-4 items-center py-[15px] leading-22 pl-[23px] text-sm " +
          (isActive
            ? "border-l-TrueBlue_500 text-TrueBlue_500 font-semibold"
            : " border-l-transparent font-normal  text-GreyPrimary ")
        );
      }}
    >
      <div className="w-7">
        <props.item.icon
          color={match ? Colors.TrueBlue500 : Colors.Grey_Primary}
        />
      </div>
      {t(props.item?.name || "")}
    </NavLink>
  );
};

const Navleft = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="flex items-center h-[120px] justify-center">
        <Link className="flex items-center relative justify-center" to="/">
          <div className="rotate-logo">
            <ICLogoFrame width={101.5} height={94} color={Colors.text_EA222A} />
          </div>
          <div className=" absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <div className="scale-logo scale-0">
              <ICGm color={Colors.Grey_Primary} />
            </div>
          </div>
        </Link>
      </div>
      <ul className="mt-[120px]">
        {RouterManage.map((item, index) => {
          return !item.isHidden ? (
            <li key={index}>
              <RenderLink item={item} />
            </li>
          ) : null
        })}
      </ul>
    </div>
  );
};

export default Navleft;
