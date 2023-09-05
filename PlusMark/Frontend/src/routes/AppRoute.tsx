import NewAdd from "@components/AdminComponents/New/NewAdd";
import NewEdit from "@components/AdminComponents/New/NewEdit";
import PolicyAdd from "@components/AdminComponents/Policy/PolicyAdd";
import PolicyEdit from "@components/AdminComponents/Policy/PolicyEdit";
import ProductEditComponent from "@components/AdminComponents/ProductEditComponent";
import TradeMarkComponent from "@components/AdminComponents/TradeMarkComponent";
import VoucherEditComponent from "@components/AdminComponents/VoucherEditComponent";
import LayoutAdminPage from "@layout/LayoutAdminPage";
import ManagerCategory from "@pages/AdminPage/Category/ManagerCategory";
import ManagerAccounts from "@pages/AdminPage/ManageAccounts";
import ManagerBanner from "@pages/AdminPage/ManageBanner";
import ManageContenFooter from "@pages/AdminPage/ManageContenFooter";
import ManageInfoContact from "@pages/AdminPage/ManageInfoContact";
import ManageInfoHome from "@pages/AdminPage/ManageInfoHome";
import ManagerOrder from "@pages/AdminPage/ManageOrder";
import ManagePolicy from "@pages/AdminPage/ManagePolicy";
import ManagerPopupContact from "@pages/AdminPage/ManagePopupContact";
import ManageProduct from "@pages/AdminPage/Products/ManageProduct";
import ManagerIntroduce from "@pages/AdminPage/ManagerIntroduce";
import ManagerVoucher from "@pages/AdminPage/ManageVoucher";
import CartPage from "@pages/CartPage/CartPage";
import PaymentPage from "@pages/CartPage/Payment";
import PaymentNew from "@pages/CartPage/PaymentNew";
import ContactPage from "@pages/Contactpage";
import ManageContact from "@pages/Contactpage/ManageContact";
import DetailNews from "@pages/DetailNewspage";
import NewNews from "@pages/DetailNewspage/NewNews";
import HomePage from "@pages/Homepage";
import { Intropage } from "@pages/Intropage";
import LayoutIntroPage from "@pages/Intropage/LayoutIntroPage";
import NewsPage from "@pages/Newspage";
import ManageNews from "@pages/Newspage/ManageNews";
import Policypage from "@pages/Policypage";
import ProductDetailNew from "@pages/Product/ProductDetailNew";
import SearchPage from "@pages/SearchPage";
import FilterPage from "@pages/SearchPage/FilterPage";
import AuthService from "@services/AuthServices";
import { ROUTES } from "@utility/constants";
import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

const AppRoutes = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (pathname != "/cart/payment") {
      window.sessionStorage.removeItem("voucher");
      window.sessionStorage.removeItem("money_voucher");
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path={ROUTES.homepage} element={<HomePage />} />
      <Route path={ROUTES.intro.index} element={<LayoutIntroPage />}>
        <Route index element={<Intropage />} />
        <Route path={ROUTES.intro.contact} element={<ContactPage />} />
        <Route path={ROUTES.intro.news.index} element={<NewsPage />} />
        <Route path={ROUTES.intro.policy} element={<Policypage />} />
        <Route path={ROUTES.intro.news.detail} element={<DetailNews />} />
      </Route>

      <Route path={ROUTES.product.detail()} element={<ProductDetailNew />} />
      <Route path={ROUTES["cart"]["index"]} element={<CartPage />} />
      <Route path={ROUTES["cart"]["payment"]} element={<PaymentNew />} />
      <Route path={ROUTES["payment"]["index"]} element={<PaymentPage />} />

      <Route path={ROUTES.search.index} element={<SearchPage />} />
      <Route path={ROUTES.search.filter} element={<FilterPage />} />

      {/* admin */}
      <Route path={ROUTES.admin.index} element={<LayoutAdminPage />}>
        {/* new changes 22/4 2022*/}
        {/* <Route index path={ROUTES.admin.order.index} element={<OrderPage />} /> */}
        <Route path={ROUTES.admin.order.index} element={<ManagerOrder />} />
        <Route path={ROUTES.admin.products.index} element={<ManageProduct />} />
        <Route
          path={ROUTES.admin.products.add}
          element={<ProductEditComponent />}
        />
        <Route
          path={ROUTES.admin.products.edit}
          element={<ProductEditComponent />}
        />

        {/* categoryManager */}
        <Route
          path={ROUTES.admin.cartegory.index}
          element={<ManagerCategory />}
        />

        {/* tradeManager */}
        <Route
          path={ROUTES.admin.cartegory.tradeMarkAdd}
          element={<TradeMarkComponent />}
        />
        <Route
          path={ROUTES.admin.cartegory.tradeMarkEdit}
          element={<TradeMarkComponent />}
        />

        {/* VoucherManager */}
        <Route path={ROUTES.admin.voucher.index} element={<ManagerVoucher />} />
        <Route
          path={ROUTES.admin.voucher.add}
          element={<VoucherEditComponent />}
        />
        <Route
          path={ROUTES.admin.voucher.view}
          element={<VoucherEditComponent />}
        />

        {/* IntroduceManager */}

        <Route
          path={ROUTES.admin.introduce.index}
          element={<ManagerIntroduce />}
        />

        {/* NewManager */}
        <Route path={ROUTES.admin.news.index} element={<ManageNews />} />
        <Route path={ROUTES.admin.news.add} element={<NewAdd />} />
        <Route path={ROUTES.admin.news.update} element={<NewEdit />} />

        {/* policyManage */}
        <Route path={ROUTES.admin.policy.index} element={<ManagePolicy />} />
        <Route path={ROUTES.admin.policy.add} element={<PolicyAdd />} />
        <Route path={ROUTES.admin.policy.edit} element={<PolicyEdit />} />

        <Route path={ROUTES.admin.advice.index} element={<ManageContact />} />

        <Route
          path={ROUTES.admin.infomation.index}
          element={<ManagerBanner />}
        />
        <Route
          path={ROUTES.admin.infomation.home}
          element={<ManageInfoHome />}
        />
        <Route
          path={ROUTES.admin.infomation.contact}
          element={<ManageInfoContact />}
        />
        <Route path={ROUTES.admin.infomation.index} element={<ManageNews />} />
        <Route
          path={ROUTES.admin.infomation.footer}
          element={<ManageContenFooter />}
        />
        <Route
          path={ROUTES.admin.infomation.popup}
          element={<ManagerPopupContact />}
        />
        <Route
          path={ROUTES.admin.acounts.index}
          element={<ManagerAccounts />}
        />
      </Route>

      {/* <Route path="/" element={<AuthProtected />}>
        <Route index element={<div>index</div>} />
        <Route path="/test" element={<div>test</div>}/>
      </Route> */}
    </Routes>
  );
};

export default AppRoutes;
