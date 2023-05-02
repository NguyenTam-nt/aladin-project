import { Footer } from "layouts/Footer";
import { Header } from "layouts/Header";
import React from "react";
import { Outlet } from "react-router-dom";

export const PublicLayout = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
