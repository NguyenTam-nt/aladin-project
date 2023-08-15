import { Logo, MenuIcon, UserIcon } from "@assets/icons";
import NavigationAdmin from "@components/about/navigate/NavigationAdmin";
import { ROUTES } from "@utility/constants";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function HeaderAdmin(props: any) {
  const [isMenu, setMenu] = useState<boolean>(false);
  return (
    <div className="sticky top-0 z-max bg-gray-100 border-b">
      <div className="border-gray-300 xl:h-100 h-[70px]">
        <div className="container px-[10px] xl:px-8  h-full flex items-center justify-between">
          <div className="w-[var(--ml-search-header)] pr-8">
            <Link to={ROUTES["homepage"]}>
              <Logo className="" fill="white" width={142} />
            </Link>
          </div>
          <div className="flex items-center cursor-pointer xl:hidden">
            <UserIcon className="fill-gray-300 mr-6 w-[33px] h-[33px]" />
            <MenuIcon
              className="fill-gray-300"
              onClick={() => setMenu(!isMenu)}
            />
          </div>
        </div>
      </div>
      {isMenu && (
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
      )}
    </div>
  );
}

export default HeaderAdmin;
