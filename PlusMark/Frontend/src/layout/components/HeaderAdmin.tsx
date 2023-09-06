import { Logo } from "@assets/icons";
import useI18n from "@hooks/useI18n";
import { ROUTES } from "@utility/constants";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Avatar from "./Avatar";
import { LanguageBox } from "./Header";
import { RouterManage } from "@utility/routers";

function HeaderAdmin(props: any) {
  const [isMenu, setMenu] = useState<boolean>(false);
  const { t } = useI18n();
  const [nameHeader, setNameHeader] = useState<string | null>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const endPath = pathname.slice(pathname.lastIndexOf("/") + 1);
    const ObName = RouterManage.find((item) => {
      return item.path.includes(endPath);
    });
    if (ObName) {
      setNameHeader(ObName.name!);
    }
  }, [pathname]);
  return (
    <div className="sticky top-0 z-max bg-header border-b">
      <div className="border-gray-300 xl:h-100 h-[70px]">
        <div className="w-full h-full pr-[127px] grid grid-cols-[300px_1fr] gap-[113px]">
          <Link
            to={ROUTES["homepage"]}
            className="flex items-center justify-end pl-5"
          >
            <Logo className="" fill="white" width={142} />
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-title font-bold text-white">
                {/* Quản lý danh mục sản phẩm */}
                {nameHeader && t(nameHeader)}
              </p>
            </div>
            <div className="flex items-center gap-16">
              <div>
                <LanguageBox />
              </div>
              <Avatar />
            </div>
          </div>
          {/* <div className="flex items-center cursor-pointer xl:hidden">
            <UserIcon className="fill-gray-300 mr-6 w-[33px] h-[33px]" />
            <MenuIcon
              className="fill-gray-300"
              onClick={() => setMenu(!isMenu)}
            />
          </div> */}
        </div>
      </div>
      {/* {isMenu && (
        <>
          <div
            onClick={() => setMenu(false)}
            className="xl:hidden w-full fixed top-0 bottom-0 linearGradien"
          ></div>
          <div
            className={
              (isMenu ? "w-[300px]" : "w-0") +
              " overflow-x-hidden xl:hidden absolute top-0 h-screen right-0 transition-all z-max bg-white overflow-y-auto hiddenScroll duration-1000 ease-linear"
            }
          >
            <div className="h-[1300px]">
              <NavigationAdmin onClickActive={() => setMenu(false)} />
            </div>
          </div>
        </>
      )} */}
    </div>
  );
}

export default HeaderAdmin;
