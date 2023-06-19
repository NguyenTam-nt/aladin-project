import React from "react";
import { HomeSales } from "./components/HomeSales";
import { HomeVideo } from "./components/HomeVideo";
import { HomePost } from "./components/HomePost";

export const HomeAdmin = () => {
  return (
    <>
      <HomeSales />
      <HomeVideo />
      <HomePost />
    </>
  );
};
