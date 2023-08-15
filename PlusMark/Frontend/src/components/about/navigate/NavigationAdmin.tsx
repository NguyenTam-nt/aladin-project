import {
  AccountIcon,
  AdviseIcon,
  BoxShopIcon,
  InforIcon,
  LogOut,
  OrderIcon,
  ProductIcon,
  VoucherIcon,
} from "@assets/icons";
import AuthService from "@services/AuthServices";
import { ROLES, ROUTES } from "@utility/constants";
import { some } from "@utility/helper";
import { Fragment } from "react";
import { NavLink } from "react-router-dom";
interface Props {
  onClickActive?: () => void;
}
function NavigationAdmin(props: Props) {
  const listRouter: some[] = [
    {
      name: "Quản lý đơn hàng",
      path: `/${ROUTES.admin.index}`,
      icon: <OrderIcon />,
    },
    {
      name: "Quản lý sản phẩm",
      path: `/${ROUTES.admin.index}/${ROUTES.admin.products.index}`,
      icon: <ProductIcon />,
      subPath: [
        {
          name: "Quản danh mục sản phẩm",
          path: `/${ROUTES.admin.index}/${ROUTES.admin.cartegory.index}`,
        },
        {
          name: "Tất cả sản phẩm",
          path: `/${ROUTES.admin.index}/${ROUTES.admin.products.index}`,
        },
        {
          name: "Thêm sản phẩm",
          path: `/${ROUTES.admin.index}/${ROUTES.admin.products.add}`,
        },
      ],
    },
    {
      name: "Tạo voucher",
      path: `/${ROUTES.admin.index}/${ROUTES.admin.voucher.index}`,
      icon: <VoucherIcon />,
    },
    {
      name: "Quản lý yêu cầu tư vấn",
      path: `/${ROUTES.admin.index}/${ROUTES.admin.advice.index}`,
      icon: <AdviseIcon />,
    },
    {
      name: "Quản lý về Supershop",
      path: `/${ROUTES.admin.index}/${ROUTES.admin.news.index}`,
      icon: <BoxShopIcon />,
      subPath: [
        {
          name: "Quản lý giới thiệu",
          path: `/${ROUTES.admin.index}/${ROUTES.admin.introduce.index}`,
        },
        {
          name: "Quản lý tin tức",
          path: `/${ROUTES.admin.index}/${ROUTES.admin.news.index}`,
        },
        {
          name: "Quản lý chính sách",
          path: `/${ROUTES.admin.index}/${ROUTES.admin.policy.index}`,
        },
      ],
    },
    {
      name: "Quản lý thông tin trang",
      path: `/${ROUTES.admin.index}/${ROUTES.admin.infomation.index}`,
      icon: <InforIcon />,
      subPath: [
        {
          name: "Banner",
          path: `/${ROUTES.admin.index}/${ROUTES.admin.infomation.index}`,
        },
        {
          name: "Thông tin trang chủ",
          path: `/${ROUTES.admin.index}/${ROUTES.admin.infomation.home}`,
        },
        {
          name: "Thông tin trang liên hệ",
          path: `/${ROUTES.admin.index}/${ROUTES.admin.infomation.contact}`,
        },
        {
          name: "Thông tin chân trang",
          path: `/${ROUTES.admin.index}/${ROUTES.admin.infomation.footer}`,
        },
        {
          name: "Thông tin popup liên hệ",
          path: `/${ROUTES.admin.index}/${ROUTES.admin.infomation.popup}`,
        },
      ],
    },
    {
      name: "Tài khoản quản lý web",
      path: `/${ROUTES.admin.index}/${ROUTES.admin.acounts.index}`,
      icon: <AccountIcon />,
      role: ROLES.system,
    },
  ];
  const handleLogout = () => {
    AuthService.doLogout();
  };
  return (
    <div className="pt-[10px] border-t-4 xl:border-t-main border-r-[1px] border-b-[1px] border-r-gray-200 border-b-gray-200 border-transparent h-full xl:block flex flex-col">
      {/* new changes 22/4 2022*/}
      <ul className="px-5  m-0 pb-10px border-b border-b-gray-200 ">
        {listRouter.map((item, index) => {
          return !item.role || AuthService.hasRole([item.role]) ? (
            <li
              key={index}
              className="mt-[30px] flex gap-5"
              onClick={() => {
                props.onClickActive && props.onClickActive();
              }}
            >
              {/* <div>{item.icon}</div> */}
              <NavLink to={item.path}>{item.icon}</NavLink>
              <div>
                <NavLink
                  to={item.path}
                  end
                  className={({ isActive }) =>
                    "font-medium text-base items-center leading-21px tracking-[.03] " +
                    (isActive ? "text-icon-active" : "text-text")
                  }
                >
                  {item.name}
                </NavLink>

                {item.subPath && (
                  <ul className="m-0 pt-[10px]">
                    {item.subPath.map((itemSub: any, indexSub: any) => {
                      return (
                        <li key={`menu${indexSub}`} className="mt-[6px]">
                          <NavLink
                            to={itemSub.path}
                            end
                            className={({ isActive }) =>
                              "font-medium text-base leading-21px tracking-[.03]  block " +
                              (isActive ? "text-icon-active" : "text-text")
                            }
                          >
                            {itemSub.name}
                          </NavLink>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </li>
          ) : (
            <Fragment key={index + "fragment"}></Fragment>
          );
        })}
      </ul>
      <div
        onClick={handleLogout}
        className="px-5 py-6 cursor-pointer flex gap-5 items-center"
      >
        <LogOut className="" />
        <p className="font-medium text-base leading-21px tracking-[.03]">
          Đăng xuất
        </p>
      </div>
    </div>
  );
}

export default NavigationAdmin;
