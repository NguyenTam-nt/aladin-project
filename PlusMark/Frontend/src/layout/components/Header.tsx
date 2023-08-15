import {
  CartIcon,
  GuaranteIcon,
  KoreaFlag,
  Logo,
  MenuMobileIconIcon,
  NewIcon,
  PhoneIcon,
  UnitedSateIcon,
  UserIcon,
} from "@assets/icons";
import HeaderSearch from "@components/common/HeaderSearch";
import { Link, useNavigate } from "react-router-dom";
import { ROLES, ROUTES } from "@utility/constants";
import CategoryItem from "./CategoryItem";
import i18next from "i18next";
import CartProductNew from "@components/Cart/CartProductNew";
import CartProductHover from "@components/Cart/CartProductHover";
import useI18n from "@hooks/useI18n";
import { memo, useContext, useEffect, useState } from "react";
import { ModalContext } from "@contexts/contextModal";
import HeaderMenuMobile from "./HeaderMenuMobile";
import { useCart } from "@contexts/CartContext";
import FooterServices, {
  ContentFooter,
  ResponseFooter,
} from "@services/FooterService";
import CategoryProductServices, {
  ProductCategoryHeader,
  ProductCategoryHeaderItem,
  ProductTrademarkHeader,
} from "@services/CategoryProductServices";
import { some } from "@utility/helper";
import AuthService from "@services/AuthServices";
import clsx from "clsx";
import VnIcon from "@assets/icons/VnIcon";
import { useTranslation } from "react-i18next";

const mapped = [
  {
    label: "Về Supershop",
    href: "/about-us",
  },
];

export type CategoryHeaderItem = {
  id?: number | null;
  title: string;
  items?: CategoryHeaderItem[];
};

export type CategoryHeader = {
  text: string;
  items: CategoryHeaderItem[];
};
// "i18next": "^22.4.14",
export const LanguageBox = memo(() => {
  const { lang, t, i18n } = useI18n();

  const handleSetLanguage = (language: "vi" | "en") => {
    i18n.changeLanguage(language);
  };
  return (
    <div className="cursor-pointer group relative w-full">
      <div>
        {/* {lang == "vi" ? <VnIcon width={64} height={35} /> : <KoreaFlag />} */}
        {<KoreaFlag />}
      </div>

      {/* {lang == "vi" ? (
        <KoreaFlag
          onClick={() => handleSetLanguage("en")}
          className="w-full absolute top-full left-0 group-hover:block hidden"
        />
      ) : (
        <div
          className="w-full absolute top-full left-0 group-hover:block hidden"
          onClick={() => handleSetLanguage("vi")}
        >
          <VnIcon />
        </div>
      )} */}
    </div>
  );
});

export const NavHeader = memo(
  ({ phoneNumber, fill }: { phoneNumber?: string; fill?: string }) => {
    const { t } = useI18n();
    return (
      <div className="flex sm:flex-row flex-col sm:items-center gap-4 sm:text-sm text-lg font-normal  sm:text-white text-black">
        <a
          href={`tel:${phoneNumber && phoneNumber.replace(/\s/g, "")}`}
          className="hover:cursor-pointer flex sm:gap-1 gap-4 items-center "
        >
          <PhoneIcon
            className="fill-main sm:w-auto w-7"
            fill={fill || "white"}
            stroke={fill || "white"}
            width={20}
          />
          <p className="sm:px-2 sm:text-wap-regular1 ">
            {phoneNumber! ? fill : "1800.3675"}
          </p>
        </a>
      </div>
    );
  }
);
const Header = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { setContentModal, setShowModal } = useContext(ModalContext);
  const cartContext = useCart();
  const [footerInfo, setFooterInfo] = useState<ContentFooter>();
  const [maleCategory, setMaleCategory] = useState<ProductCategoryHeader[]>();
  const [femaleCategory, setFemaleCategory] =
    useState<ProductCategoryHeader[]>();
  const [trademarkCategory, setTrademarkCategory] =
    useState<ProductTrademarkHeader[]>();
  const [trademarkCategoryDiffer, setTrademarkCategoryDiffer] =
    useState<ProductTrademarkHeader[]>();
  const [categoryHeader, setCategoryHeader] = useState<CategoryHeader[]>([]);

  useEffect(() => {
    try {
      getHeaderMale();
    } catch (error) {}
  }, []);

  const openMenuMobile = () => {
    setContentModal(<HeaderMenuMobile categoryData={categoryHeader} />);
    setShowModal(true);
  };

  useEffect(() => {
    try {
      FooterServices.get().then((data) => {
        setFooterInfo(data);
      });
    } catch (error) {}
  }, []);

  const userLogin = () => {
    if (!AuthService.isLoggedIn()) {
      AuthService.doLogin();
    }
  };
  const userLogout = () => {
    AuthService.doLogout();
  };
  const getHeaderMale = () => {
    CategoryProductServices.getFilterCategory("male").then((data) => {
      setMaleCategory(data.data);
      let m: CategoryHeader = {
        text: "Nam",
        items: data.data.map((it, i) => {
          return {
            id: it.id,
            title: it.categoryName,
            items: it.categoryNewDetails?.map((c) => {
              return {
                id: c.id,
                title: c.categoryDetailName,
              };
            }),
          };
        }),
      };
      setCategoryHeader((pre) => {
        pre.push(m);
        getHeaderFemale();
        return [...pre];
      });
    });
  };

  const getHeaderFemale = () => {
    CategoryProductServices.getFilterCategory("female").then((data) => {
      setFemaleCategory(data.data);
      let m: CategoryHeader = {
        text: "Nữ",
        items: data.data.map((it, i) => {
          return {
            id: it.id,
            title: it.categoryName,
            items: it.categoryNewDetails?.map((c) => {
              return {
                id: c.id,
                title: c.categoryDetailName,
              };
            }),
          };
        }),
      };
      setCategoryHeader((pre) => {
        pre.push(m);
        getHeaderTrademark();
        return [...pre];
      });
    });
  };

  const getHeaderTrademark = () => {
    CategoryProductServices.getTrademarkHeader().then((data) => {
      // console.log(data);

      setTrademarkCategory(data);
      let m: CategoryHeader[] = data.map((tmh, i) => {
        let items = [];
        if (tmh.male) {
          items.push({
            title: "Nam",
            items: tmh.male.map((c) => {
              return {
                id: c.id,
                title: c.categoryName,
              };
            }),
          });
        }

        if (tmh.female) {
          items.push({
            title: "Nữ",
            items: tmh.female.map((c) => {
              return {
                id: c.id,
                title: c.categoryName,
              };
            }),
          });
        }

        return {
          text: tmh.tradeMarkName,
          items: items,
        };
      });

      setCategoryHeader((pre) => {
        getHeaderTrademarkDiffer();
        return [...pre, ...m];
      });
    });
  };

  const getHeaderTrademarkDiffer = () => {
    CategoryProductServices.getTrademarkDiffer().then((data) => {
      // console.log(data.data);

      setTrademarkCategoryDiffer(data);
      if (data && data.length > 0) {
        let m: CategoryHeader = {
          text: "Thương hiệu khác",
          items: data.map((tmh: ProductTrademarkHeader) => {
            return {
              title: tmh.tradeMarkName,
              items: [],
            };
          }),
        };

        setCategoryHeader((pre) => {
          return [...pre, m];
        });
      }
    });
  };

  // console.log(categoryHeader);

  return (
    <div className="sticky top-0 z-50 bg-gray-100 lg:h-header lg:shadow  bg-header flex items-center justify-between px-4 xl:px-[129px] py-4 gap-[50px]">
      <Link to={ROUTES["homepage"]} className="">
        <Logo className="" fill="white" />
      </Link>
      <div className="rounded-[6px] lg:block hidden py-1 px-2 w-[147px] break-words text-sm text-white bg-[#00C3AB]">
        Xem giá, tồn kho tại: Hà Nội
      </div>
      <div className="items-center w-2/4">
        <HeaderSearch />
      </div>
      <div className="lg:block hidden">
        <NavHeader phoneNumber={footerInfo?.phoneNumber[0]} />
      </div>
      {/* <div className="flex items-center gap-5">
        <CartIcon className="fill-gray-300 w-8 lg:w-auto" stroke="white" />
        <UserIcon
          className={clsx(" fill-gray-300 ", {
            "cursor-pointer": !AuthService.isLoggedIn(),
          })}
          onClick={userLogin}
          stroke="white"
        />
      </div> */}
      <div className="lg:block hidden">
        <LanguageBox />
      </div>
      <MenuMobileIconIcon
        onClick={openMenuMobile}
        className="block lg:hidden w-10 ml-4 hover:cursor-pointer"
        fill="white"
        stroke="white"
      />

      {/* <div className="border-b lg:py-0 h-2/3 bg-header">
        <div className="px-4 xl:px-[129px] py-4 h-full flex items-center justify-between lg:gap-[50px]">
          <Link to={ROUTES["homepage"]} className="md:mr-14 mr-8">
            <Logo className="" fill="white" />
          </Link>

          <div className="flex flex-1 lg:justify-between justify-end items-center lg:gap-[50px]">
            <div className="rounded-[6px] lg:block hidden py-1 px-2 w-[147px] break-words text-sm text-white bg-[#00C3AB]">
              Xem giá, tồn kho tại: Hà Nội
            </div>
            <div className="hidden md:block items-center w-2/4">
              <HeaderSearch />
            </div>
            <div className="lg:block hidden">
              <NavHeader phoneNumber={footerInfo?.phoneNumber[0]} />
            </div>
            <div className="flex items-center gap-4 relative">
              <div
                className="relative lg:block hidden group hover:cursor-pointer"
                onClick={() => navigate(ROUTES["cart"]["index"])}
              >
                <CartIcon
                  className="fill-gray-300 w-8 lg:w-auto"
                  stroke="white"
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
              <div className="relative group hidden lg:block">
                <UserIcon
                  className={clsx(" fill-gray-300 ", {
                    "cursor-pointer": !AuthService.isLoggedIn(),
                  })}
                  onClick={userLogin}
                  stroke="white"
                />
                {AuthService.isLoggedIn() && (
                  <div className="group-hover:block hidden absolute top-[calc(100%_+_16px)]  -right-3 z-10">
                    <div className=" bg-white shadow-md rounded-md w-fit h-fit relative ">
                      <div className="trangle arrow-up absolute bottom-full right-4 border-l-[8px] border-r-[8px] border-b-[8px] border-b-white group-hover:border-b-icon"></div>
                      <div className="absolute bottom-full w-full h-4 left-0"></div>
                      <p
                        className="rounded-md px-4 py-2 whitespace-nowrap cursor-pointer bg-icon hover:text-main transition-all"
                        onClick={userLogout}
                      >
                        {t("header.logout")}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <MenuMobileIconIcon
                onClick={openMenuMobile}
                className="block lg:hidden w-10 ml-4 hover:cursor-pointer"
                fill="white"
                stroke="white"
              />
            </div>
            <div className="lg:block hidden">
              <LanguageBox />
            </div>
          </div>
        </div>
      </div>

      <div className="block lg:hidden container px-4 flex-1 lg:pr-4 xl:pr-14">
        <HeaderSearch />
      </div>

      <div className="hidden lg:flex container h-1/3 px-8  justify-between gap-5 text-wap-regular1">
        <div className="flex gap-9 h-full">
          {categoryHeader.map((it, idx) => (
            <CategoryItem key={idx} data={it} />
          ))}
        </div>
        <div className="flex gap-3">
          {AuthService.hasRole([ROLES.admin, ROLES.system]) ? (
            <Link
              className="flex items-center text-normal1 hover:text-main"
              to={"/admin"}
            >
              {t("header.admin")}
            </Link>
          ) : (
            <></>
          )}

          <Link
            className="flex items-center text-normal1 hover:text-main"
            to={"/about-us"}
          >
            {t("header.about")}
          </Link>
        </div>
      </div> */}
    </div>
  );
};

export default Header;
