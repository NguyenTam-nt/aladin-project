import { prefixRootRoute } from "@constants/index";
import { routersPublic } from "@constants/routerPublic";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const PublicLayout = lazy(() =>
  import("../layouts/public").then((modaule) => ({
    default: modaule.PublicLayout,
  }))
);
const LayoutManage = lazy(() => import("../layouts/LayoutManage"));

export const RouterRoot = () => {
  return (
    <Routes>
      <Route path={prefixRootRoute.public} element={<PublicLayout />}>
        {routersPublic.map((item, index) => {
          return (
            <Route
              key={index}
              path={item.path}
              element={
                <Suspense>
                  <item.element />
                </Suspense>
              }
            />
          );
        })}
      </Route>
      <Route path={prefixRootRoute.admin} element={<LayoutManage />}>
        <Route path={"trangchu"} element={<div>quan ly trang chủ</div>} />
      </Route>
    </Routes>
  );
};
