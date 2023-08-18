import { ClearIcon } from "@assets/icons";
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
import ShopIcon from "@assets/iconElements/ShopIcon";
import PhoneIcon from "@assets/iconElements/PhoneIcon";
import { phoneNumber } from "@utility/types";
import { colors } from "@utility/colors";
import CartIcon from "@assets/iconElements/CartIcon";
import UserIconElm from "@assets/iconElements/UserIconElm";
import useFocusOut from "@hooks/useFocusOut";

interface Props {
  categoryData: CategoryHeader[];
  handleShowFormLocation?: () => void;
}

function HeaderMenuMobile({ categoryData, handleShowFormLocation }: Props) {
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

        <div className="px-5 pb-10 flex flex-col gap-5 py-6 border-t border-t-gray-200 ">
          <div>
            <div
              onClick={() => {
                handleShowFormLocation!();
                closeModal();
              }}
              className="rounded-[6px] cursor-pointer xl:hidden block py-1 px-2 w-[147px] break-words text-sm text-white bg-[#00C3AB]"
            >
              Xem giá, tồn kho tại: Hà Nội
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-[70px] border">
              <LanguageBox />
            </div>
            <div
              className="relative group hover:cursor-pointer"
              onClick={() => navigate(ROUTES["cart"]["index"])}
            >
              <CartIcon color={colors.main} />
              {cartContext.cartQuantity > 0 && (
                <div className="absolute -top-1 -right-2 rounded-full bg-cancel aspect-square border w-5 h-5 text-xs text-white border-white flex justify-center items-center ">
                  {cartContext.cartQuantity}
                </div>
              )}
            </div>
          </div>

          <a
            href={`tel:${phoneNumber.replace(/\s/g, "")}`}
            className="hover:cursor-pointer flex sm:gap-1 gap-4 items-center "
          >
            <PhoneIcon color={colors.gray03} width={30} height={26} />
            <p className="sm:px-2 sm:text-wap-regular1 ">{phoneNumber}</p>
          </a>
          {AuthService.hasRole([ROLES.admin, ROLES.system]) ? (
            <Link
              className="flex pl-11 mt-4 items-center text-normal1"
              to={"/admin"}
              onClick={closeModal}
            >
              {t("link.manage")}
            </Link>
          ) : null}
          <Link
            to={"/about-us"}
            className="flex gap-4 items-center"
            onClick={closeModal}
          >
            <div className="w-7 ">
              <ShopIcon />
            </div>
            <span className=" text-normal1">{t("about-our")}</span>
          </Link>
          <div className="flex gap-4 items-center ">
            <div className="w-7 ">
              <UserIconElm color={colors.gray03} width={30} height={26} />
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
