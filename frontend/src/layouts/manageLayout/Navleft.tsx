import { ICGm } from "@assets/icons/ICGm";
import { ICLogoFrame } from "@assets/icons/ICLogoFrame";
import { ICMenuBar } from "@assets/icons/ICMenuBar";
import { Colors } from "@constants/color";
import { prefixRootRoute } from "@constants/index";
import { RouterManage } from "@constants/routerManager";
import clsx from "clsx";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink, useMatch, useResolvedPath } from "react-router-dom";
interface Props {
  item: {
    path: string;
    exact?: boolean;
    name?: string;
    element: any;
    icon?: any;
  };
  onShow: () => void;
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
      onClick={props.onShow}
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
      {t(props.item?.name ?? "")}
    </NavLink>
  );
};

type PropsNavleft = {
  isShown: boolean;
  onShow: () => void;
};

const Navleft = memo(({ isShown, onShow }: PropsNavleft) => {
  const { t } = useTranslation();

  return (
    <>
      <div
        className={clsx(
          "fixed w-[300px] z-[13] overflow-y-auto bg-white top-0 bottom-0 left-0 shadow-sm side-bar",
          {
            "side-bar-show": isShown,
            "side-bar-hide": !isShown,
          }
        )}
      >
        <div className="flex items-center h-[120px] px-[23px] xl:px-0 justify-between xl:justify-center">
        <button className=" xl:hidden rotate-[180deg]" onClick={onShow}>
          <ICMenuBar color={Colors.text_black} />
        </button>
          <Link className="flex items-center relative justify-center" to="/">
            <div className="rotate-logo">
              <ICLogoFrame
                width={101.5}
                height={94}
                color={Colors.primary}
              />
            </div>
            <div className=" absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
              <div className="scale-logo scale-0">
                <ICGm color={Colors.Grey_Primary} />
              </div>
            </div>
          </Link>
        </div>
        <ul className="mt-[50px] xl:mt-[100px]">
          {RouterManage.map((item, index) => {
            return !item.isHidden ? (
              <li key={index}>
                <RenderLink onShow={onShow} item={item} />
              </li>
            ) : null;
          })}
        </ul>
      </div>
      {isShown ? (
        <div
          onClick={onShow}
          className=" cursor-pointer xl:hidden bg-header_bg fixed inset-0 z-[12]"
        />
      ) : null}
    </>
  );
});

export default Navleft;
