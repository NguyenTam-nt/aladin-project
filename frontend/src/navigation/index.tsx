import { prefixRootRoute } from "@configs/index";
import { rootRouter, routerDetail } from "@constants/router";
import { rootRouterAdmin } from "@constants/routerAdmin";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const PublicLayout = lazy(()=> import("layouts/PublicLayout").then(module => ({default:  module.PublicLayout})))
const AdminLayout = lazy(()=> import("layouts/AdminLayout").then(module => ({default:  module.AdminLayout})))

export const RouterRoot = () => {
  return (
    <Routes>
      <Route path={prefixRootRoute.public} element={<PublicLayout />}>
        {rootRouter.map((item, index) => {
          return (
            <Route
              key={index}
              path={item.path}
              element={
                <Suspense>
                  <item.element />
                </Suspense>
              }
            >
              {item.subNavs &&
                !item.isHidenRouter &&
                item.subNavs.map((itemchild, index) => {
                  return (
                    <Route
                      key={index}
                      path={itemchild.path}
                      element={<itemchild.element />}
                    />
                  );
                })}
            </Route>
          );
        })}
        {routerDetail.map((item, index) => {
          return (
            <Route key={index} path={item.path} element={<item.element />} />
          );
        })}
      </Route>
      <Route path={prefixRootRoute.admin} element={<AdminLayout />}>
        {rootRouterAdmin.map((item, index) => {
          return (
            <Route key={index} path={item.path} element={<Suspense><item.element /></Suspense>}>
              {item.subNavs &&
                item.subNavs.map((itemchild, index) => {
                  return (
                    <Route
                      key={index}
                      path={itemchild.path}
                      element={<itemchild.element />}
                    />
                  );
                })}
            </Route>
          );
        })}
      </Route>
    </Routes>
  );
};
