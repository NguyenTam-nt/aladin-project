import { ICArrowDown } from "@assets/icons/ICArrowDown";
import { ICDelele } from "@assets/icons/ICDelele";
import { ICMenu } from "@assets/icons/ICMenu";
import { paths } from "@constants/router";
import { TranslateContext } from "@contexts/Translation";
import type { IHeader } from "@typeRules/footer";
import clsx from "clsx";
import React, {
  useContext,
  useState,
  useLayoutEffect,
} from "react";
import { Link } from "react-router-dom";
import { useGetHeader } from "./useGetHeader";
import { AuthContext } from "@contexts/AuthContext";
import { prefixRootRoute } from "@configs/index";
import { pathsAdmin } from "@constants/routerAdmin";

type propsNavigate = {
  isShowSidebar: boolean;
  onShow: () => void;
};

export const SidebarNavigation = ({ isShowSidebar, onShow }: propsNavigate) => {
  const { t, isVn } = useContext(TranslateContext);
  const {headers} = useGetHeader()
  const {isLogin, doLogin} = useContext(AuthContext)
  useLayoutEffect(() => {
    if (isShowSidebar) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [isShowSidebar]);

  return (
    <>
    <div
      className={clsx(
        "side-bar w-[100%] border-t-[1px] border-solid border-br_E9ECEF fixed top-[88px] bottom-0 left-0 right-0 bg-white z-[50] overflow-y-scroll py-[14px] px-[22px]",
        {
          "side-bar-show": isShowSidebar,
          "side-bar-hide": !isShowSidebar,
        }
      )}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div onClick={onShow}>
            <ICMenu />
          </div>
          <span className="text-_11 font-semibold text-text_primary ml-[11px]">
            {t("common._category")}
          </span>
        </div>
        <div onClick={onShow} className="cursor-pointer">
          <ICDelele />
        </div>
      </div>
      <div className="mt-[14px] flex items-center justify-between py-[8px] border-b-[1px] border-solid border-br_E9ECEF">
      {
        !isLogin ? (
          <button onClick={doLogin} className="text-[14px] font-bold text-secondary">
          {t("home.header.login")}
        </button>
        ) :  (
          <Link className='text-[14px] font-bold text-secondary' to={`${prefixRootRoute.admin}/${pathsAdmin.info_account.prefix}`}>{t("home.header._managent")}</Link>
        )
      }
        {/* <div className="flex items-center">
          <span className="text-_14 text-bg_7E8B99 mr-[10px]">
            {t("common._search")}
          </span>
          <ICSearch color={Colors.text_9EA8B3} />
        </div> */}
      </div>
      {headers.map((item, index) => {
        return (
          <SubNavLinkItem
            onHidden={onShow}
            subNavs={item.items?.filter(item => item.status) ?? []}
            key={index}
            path={item.link + ""}
            // isHidenRouter={item.isHidenRouter}
            name={`${isVn ? item.name : item.nameKo}`}
            // isHidenArrow={item?.isHiden}
          />
        );
      })}
    </div>
  {/* <div onClick={onShow} className={clsx("modal-sidebar duration-300 ease-linear", {
            " opacity-100 z-[8] block": isShowSidebar,
            " opacity-0 z-[-1] hidden": !isShowSidebar
        })} />
    */}
    </>
  );
};

type Props = {
  name: string;
  path: string;
  // isHidenArrow?: boolean;
  // isHidenRouter?: boolean;
  subNavs?: IHeader[]
  onHidden: () => void;
};

export const SubNavLinkItem = ({ name, path, subNavs, onHidden }: Props) => {
  const { t, isVn } = useContext(TranslateContext);
  const [isShow, setIsShow] = useState(false);
  const handleShow = () => {
    setIsShow(!isShow);
  };
  return (
    <div
      className={clsx(
        "h-auto border-b-[1px] border-solid border-br_E9ECEF text-_14 text-text_primary"
      )}
      style={{
        ["--footer-size" as string]: subNavs?.length,
        ["--height-li" as string]: "32px",
      }}
    >
      <div
        className={clsx(
          "relative  h-[40px] items-center  flex justify-between"
        )}
      >
        <Link onClick={onHidden} to={path} className="py-[8px] block">
          {t(name)}
        </Link>
        {subNavs?.length ? (
          <div className=" cursor-pointer " onClick={handleShow}>
            <ICArrowDown />
          </div>
        ) : null}
      </div>
      {!!subNavs ? (
        <ul
          className={clsx(
            "block h-0 overflow-hidden  duration-300  ease-linear",
            { "footer-animation-list": isShow }
          )}
        >
          {subNavs.map((_item, index) => {
            return (
              <Link
              to={`${path}${ _item.link ? path === paths.news.prefix ? `?type=${_item.link}` : `/${_item.link}` : ""}`}
                onClick={onHidden}
                className="h-[32px] flex items-center"
                key={index}
              >
                ● <span className="ml-2">{isVn ? _item.name : _item.nameKo}</span>
              </Link>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};


