import { rootRouter } from "@constants/router";
import { PublicLayout } from "layouts/PublicLayout";
import {
  Route,
  Routes,
} from "react-router-dom";
export const RouterRoot = () => {
  return (
   <Routes>
    <Route path="/" element={<PublicLayout />}>
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
   </Routes> 
  )
}
