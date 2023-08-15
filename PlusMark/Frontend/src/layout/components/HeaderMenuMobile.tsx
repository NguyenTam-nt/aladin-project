import {
  CartIcon,
  ClearIcon,
  ShopIcon,
  UnitedSateIcon,
  UserIcon,
} from "@assets/icons";
import { ModalContext } from "@contexts/contextModal";
import useI18n from "@hooks/useI18n";
import { some } from "@utility/helper";
import React, { useContext } from "react";
import CategoryMobileItem from "./CategoryMobileItem";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "@services/AuthServices";
import { CategoryHeader, LanguageBox, NavHeader } from "./Header";
import { ROLES, ROUTES } from "@utility/constants";
import { useCart } from "@contexts/CartContext";
import CartProductHover from "@components/Cart/CartProductHover";

interface Props {
  categoryData: CategoryHeader[];
}

function HeaderMenuMobile({ categoryData }: Props) {
  const { t } = useI18n();
  const cartContext = useCart();
  const navigate = useNavigate();
  const { closeModal } = useContext(ModalContext);

  const userLogin = () => {
    AuthService.doLogin();
  };
  const userLogout = () => {
    AuthService.doLogout();
  };

  return (
    <div className="h-screen w-screen">
      <div className="w-3/4 h-full bg-white ml-auto  flex flex-col justify-between">
        <div
          className="px-5 hover:cursor-pointer py-6 flex justify-end"
          onClick={closeModal}
        >
          <ClearIcon />
        </div>
        <div className="px-5 flex-1 overflow-y-auto overflow-x-hidden pb-8">
          {categoryData.map((it: CategoryHeader, idx: any) => (
            <CategoryMobileItem key={idx} data={it} />
          ))}
        </div>

        <div className="px-5 py-6 border-t border-t-gray-200 ">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8">
              <LanguageBox />
            </div>
            <div
              className="relative group hover:cursor-pointer"
              onClick={() => navigate(ROUTES["cart"]["index"])}
            >
              <CartIcon
                className="fill-gray-300 w-8 lg:w-auto"
                fill="red"
                stroke="red"
              />
              {cartContext.cartQuantity > 0 && (
                <>
                  <div className="absolute -top-1 -right-2 rounded-full bg-cancel aspect-square h-5 lg:h-4 flex justify-center items-center ">
                    <p className="text-white text-wap-regular1 text-center">
                      {cartContext.cartQuantity}
                    </p>
                  </div>
                  <div className="lg:group-hover:block hidden absolute top-[calc(100%_+_32px)]  -right-9 z-10">
                    <CartProductHover />
                  </div>
                </>
              )}
            </div>
          </div>
          <Link
            to={"/about-us"}
            className="flex gap-4 items-center mb-4"
            onClick={closeModal}
          >
            <div className="w-7 ">
              <ShopIcon className="w-full h-auto fill-gray-300" />
            </div>
            <span className=" text-normal1">{t("about-our")}</span>
          </Link>
          <NavHeader phoneNumber={""} fill="gray" />
          {AuthService.hasRole([ROLES.admin, ROLES.system]) ? (
            <Link
              className="flex pl-11 mt-4 items-center text-normal1"
              to={"/admin"}
              onClick={closeModal}
            >
              {t("link.manage")}
            </Link>
          ) : (
            <></>
          )}
          <div className=" mt-4 flex gap-4 items-center ">
            <div className="w-7 ">
              <UserIcon className="w-full  h-auto fill-gray-300" />
            </div>

            {!AuthService.isLoggedIn() ? (
              <span className=" text-normal1" onClick={userLogin}>
                {t("login")}
              </span>
            ) : (
              <span className=" text-normal1" onClick={userLogout}>
                {t("logout")}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderMenuMobile;
