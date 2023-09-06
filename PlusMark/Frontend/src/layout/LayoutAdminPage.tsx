import NavigationAdmin from "@components/about/navigate/NavigationAdmin";
import AuthService from "@services/AuthServices";
import { ROUTES } from "@utility/constants";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import HeaderAdmin from "./components/HeaderAdmin";

function LayoutAdminPage() {
  const navigator = useNavigate();
  // const isLogin = AuthService.isLoggedIn();
  // useEffect(() => {
  //   if (!isLogin) {
  //     navigator("/");
  //   }
  //   return () => {};
  // }, [isLogin]);
  return (
    <div>
      <div className=" flex">
        <div className="w-[300px] hidden xl:block">
          <NavigationAdmin />
        </div>

        <div
          className={"flex-1 xl:pr-[290px]  xl:pl-[113px] overflow-x-hidden "}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default LayoutAdminPage;
