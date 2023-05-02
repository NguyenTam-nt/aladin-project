
import { PublicLayout } from "layouts/PublicLayout";
import { lazy } from "react";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

const HomePage = lazy(() => import("../features/home/"))

const routes = createRoutesFromElements(
    <Route path="/" element={<PublicLayout />}>
      <Route index element={<HomePage />} />
    </Route>
);

export const router = createBrowserRouter(routes)
