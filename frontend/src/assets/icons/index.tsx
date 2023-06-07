import { lazy } from "react";

export const ICLogo = lazy(() => import("./Logo").then((module) => ({default: module.ICLogo})));
export const ICArowRight = lazy(() => import("./ICArowRight").then((module) => ({default: module.ICArowRight})));