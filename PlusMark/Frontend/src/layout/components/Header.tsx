import {
  GuaranteIcon,
  KoreaFlag,
  Logo,
  MenuMobileIconIcon,
  NewIcon,
  PhoneContactIcon,
  PhoneIcon,
  PhoneOutlineIcon,
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
import { useTranslation } from "react-i18next";
import CartIcon from "@assets/iconElements/CartIcon";
import useFocusOut from "@hooks/useFocusOut";
import LocationBox from "@components/LocationComponent/LocationBox";

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
      <div>{lang == "vi" ? <KoreaFlag /> : <KoreaFlag />}</div>

      {/* {lang == "vi" ? (
        <KoreaFlag
          onClick={() => handleSetLanguage("ksl")}
          className="w-full absolute top-full left-0 group-hover:block hidden"
        />
      ) : (
        <div
          className="w-full absolute top-full left-0 group-hover:block hidden"
          onClick={() => handleSetLanguage("vi")}
        >
          <KoreaFlag />
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
          <PhoneIcon />
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
  const { clickShow, setClickShow, ref: locationRef } = useFocusOut();
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
    setContentModal(
      <HeaderMenuMobile
        categoryData={categoryHeader}
        handleShowFormLocation={() => setClickShow(true)}
      />
    );
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

  return (
    <div className="sticky top-0 z-50 bg-gray-100 xl:h-header xl:shadow ">
      <div className=" bg-header flex items-center justify-between px-[14px] lg:px-[130px] xl:px-[110px] 1.5xl:px-[130px] h-spc80 lg:gap-[50px] gap-3">
        <Link to={ROUTES["homepage"]}>
          <Logo className="xl:w-[74px] w-[60px]" fill="white" />
        </Link>
        <div
          onClick={() => setClickShow(true)}
          className="rounded-[6px] cursor-pointer xl:block hidden py-1 px-2 w-[147px] break-words text-sm text-white bg-[#00C3AB]"
        >
          Xem giá, tồn kho tại: Hà Nội
        </div>
        <div className="items-center w-2/4">
          <HeaderSearch />
        </div>
        <div className="xl:block hidden">
          <NavHeader phoneNumber={footerInfo?.phoneNumber[0]} />
        </div>
        <div className="xl:flex hidden items-center gap-5">
          <div
            className="relative  group hover:cursor-pointer"
            onClick={() => navigate(ROUTES["cart"]["index"])}
          >
            <CartIcon />
            {/* {cartContext.cartQuantity > 0 && ( */}
            <>
              <div className="absolute -top-1 -right-2 rounded-full bg-cancel aspect-square border w-5 h-5 text-xs text-white border-white flex justify-center items-center ">
                {cartContext.cartQuantity}
              </div>
              <div className="lg:group-hover:block hidden absolute top-[calc(100%_+_32px)]  -right-9 z-10">
                <CartProductHover />
              </div>
            </>
            {/* )} */}
          </div>
          <div className="group relative">
            <UserIcon
              className={clsx(" fill-gray-300 ", {
                "cursor-pointer": !AuthService.isLoggedIn(),
              })}
              onClick={userLogin}
              stroke="white"
            />
            {/* {AuthService.isLoggedIn() && ( */}
            <div className="group-hover:block hidden absolute top-full -right-3 z-10">
              <p
                className="rounded-md px-4 py-2 whitespace-nowrap cursor-pointer bg-icon hover:text-main transition-all"
                onClick={userLogout}
              >
                đăng xuất
              </p>
            </div>
            {/* )} */}
          </div>
        </div>
        <div className="xl:block hidden">
          <LanguageBox />
        </div>
        <MenuMobileIconIcon
          onClick={openMenuMobile}
          className="block xl:hidden w-10 hover:cursor-pointer"
          fill="white"
          stroke="white"
        />
        {/* <div className="block lg:hidden container px-4 flex-1 lg:pr-4 xl:pr-14">
          <HeaderSearch />
        </div> */}
      </div>

      <div className="hidden xl:flex py-3 lg:px-[130px] xl:px-[110px] 1.5xl:px-[130px] px-4 justify-between gap-5 text-wap-regular1">
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
            Giới thiệu
          </Link>
          <Link
            className="flex items-center text-normal1 hover:text-main"
            to={"/about-us"}
          >
            Hệ thống phân phân phối
          </Link>
        </div>
      </div>

      {clickShow && (
        <div
          ref={locationRef}
          className="absolute left-[400px]
           top-spc80"
        >
          <LocationBox />
        </div>
      )}
    </div>
  );
};

export default Header;
