import NavigationAdmin from "@components/about/navigate/NavigationAdmin";
import AuthService from "@services/AuthServices";
import { ROUTES } from "@utility/constants";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function LayoutAdminPage() {
  const hiddenMenu = useLocation().pathname.includes(
    `admin/${ROUTES.admin.products.index}/`
  );
  const navigator = useNavigate();
  const isLogin = AuthService.isLoggedIn();
  useEffect(() => {
    if (!isLogin) {
      navigator("/");
    }
    return () => {};
  }, [isLogin]);
  return (
    <div>
      {/* <HeaderAdmin /> */}
      <div className=" flex gap-4">
        {!hiddenMenu && (
          <div className="w-[300px] hidden xl:block">
            <NavigationAdmin />
          </div>
        )}

        <div
          className={
            "flex-1  xl:pr-[77px] overflow-x-hidden " +
            (!hiddenMenu && "xl:pl-8")
          }
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default LayoutAdminPage;
