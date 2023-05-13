import { rootRouter } from "@constants/router";
import { PublicLayout } from "layouts/PublicLayout";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

const routes = createRoutesFromElements(
  <Route path="/" element={<PublicLayout />}>
    {rootRouter.map((item, index) => {
      return (
        <Route key={index} path={item.path} element={<item.element />}>
          {
            item.subNavs && item.subNavs.map((itemchild, index) => {
              return (
                <Route key={index} path={item.path} element={<itemchild.element />} />
              )
            })
          }
        </Route>
      );
    })}
  </Route>
);

export const router = createBrowserRouter(routes);
