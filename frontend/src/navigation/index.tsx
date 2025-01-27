import { prefixRootRoute } from "@constants/index";
import { RouterManage } from "@constants/routerManager";
import { routersPublic } from "@constants/routerPublic";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const PublicLayout = lazy(() =>
  import("../layouts/public").then((modaule) => ({
    default: modaule.PublicLayout,
  }))
);
const LayoutManage = lazy(() => import("../layouts/manageLayout/index"));

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
        {RouterManage.map((routeItem, indexRout) => {
          return (
            <Route
              key={indexRout}
              path={routeItem.path}
              element={<Suspense><routeItem.element /></Suspense>}
            />
          );
        })}
      </Route>
    </Routes>
  );
};
