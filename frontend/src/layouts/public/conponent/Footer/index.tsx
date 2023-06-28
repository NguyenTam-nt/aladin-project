import React from "react";
import { FooterAbout } from "./components/FooterAbout";
import { FooterOver } from "./components/FooterOver";

export const Footer = () => {
  return (
    <div className=" bg-secondary">
      <FooterAbout />
      <FooterOver />
    </div>
  );
};
