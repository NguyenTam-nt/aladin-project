import { prefixRootRoute } from "@constants/index";
import { routersPublic } from "@constants/routerPublic";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const PublicLayout = lazy(() =>
  import("../layouts/public").then((modaule) => ({
    default: modaule.PublicLayout,
  }))
);

export const RouterRoot = () => {
  return (
    <Routes>
      <Route path={prefixRootRoute.public} element={<PublicLayout />}>
        {routersPublic.map((item, index) => {
          console.log(item.path, "path");
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
    </Routes>
  );
};
