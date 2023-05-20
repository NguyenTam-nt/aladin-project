import { prefixRootRoute } from "@configs/index";
import { rootRouter } from "@constants/router";
import { rootRouterAdmin } from "@constants/routerAdmin";
import { AdminLayout } from "layouts/AdminLayout";
import { PublicLayout } from "layouts/PublicLayout";
import {
  Route,
  Routes,
} from "react-router-dom";
export const RouterRoot = () => {
  return (
   <Routes>
    <Route path={prefixRootRoute.public} element={<PublicLayout />}>
    {rootRouter.map((item, index) => {
      return (
        <Route key={index} path={item.path} element={<item.element />}>
          {
            item.subNavs && !item.isHidenRouter && item.subNavs.map((itemchild, index) => {
              return (
                <Route key={index} path={itemchild.path} element={<itemchild.element />} />
              )
            })
          }
        </Route>
      );
    })}
  </Route>
  <Route path={prefixRootRoute.admin} element={<AdminLayout />}>
      {
        rootRouterAdmin.map((item, index) => {
          return (
            <Route key={index} path={item.path} element={<item.element />}>
              {
                item.subNavs && item.subNavs.map((itemchild, index) => {
                  return (
                    <Route key={index} path={itemchild.path} element={<itemchild.element />} />
                  )
                })
              }
            </Route>
          );
        })
      }
  </Route>
   </Routes> 
  )
}
