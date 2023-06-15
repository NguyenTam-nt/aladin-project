import { ICGm } from "@assets/icons/ICGm";
import { ICLogoFrame } from "@assets/icons/ICLogoFrame";
import { Colors } from "@constants/color";
import { RouterManage } from "@constants/routerManager";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink, useLocation } from "react-router-dom";
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
          " flex gap-[10px] border-l-4 items-center py-[15px] leading-22 pl-[23px] text-sm " +
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
