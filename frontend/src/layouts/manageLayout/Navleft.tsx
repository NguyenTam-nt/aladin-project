import { Colors } from "@constants/color";
import { RouterManage } from "@constants/routerManager";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";
interface Props {
  item: {
    path: string;
    exact?: boolean;
    name: string;
    element: any;
    icon: any;
  };
}
const RenderLink = (props: Props) => {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const [colorIcon, setColorIcon] = useState(Colors.Grey_Primary);
  useEffect(() => {
    if (
      `/${pathname.split("/")[pathname.split("/").length - 1]}`.includes(
        props.item.path
      )
    ) {
      setColorIcon(Colors.TrueBlue500);
    } else {
      setColorIcon(Colors.Grey_Primary);
    }
  }, [pathname]);
  return (
    <NavLink
      to={props.item.path}
      end
      className={({ isActive }) => {
        return (
          " flex gap-[10px] border-l-4  py-[15px] leading-22 pl-[23px] text-sm " +
          (isActive
            ? "border-l-TrueBlue_500 text-TrueBlue_500 font-semibold"
            : " border-l-transparent font-normal  text-GreyPrimary ")
        );
      }}
    >
      <div className="w-7">{props.item.icon(colorIcon)}</div>
      {t(props.item.name)}
    </NavLink>
  );
};

const Navleft = () => {
  const { t } = useTranslation();
  return (
    <div className="pt-28 h-screen overflow-y-scroll">
      <ul>
        {RouterManage.map((item, index) => {
          if (item.isHidden) return;
          return (
            <li key={index}>
              <RenderLink item={item} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Navleft;
