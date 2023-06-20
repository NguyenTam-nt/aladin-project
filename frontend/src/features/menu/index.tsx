import React from "react";
import { Banner } from "@components/Banner";
import { MenuBody } from "./components/MenuBody";
import { HomeTopicType } from "@typeRules/home";

export const Menu = () => {
  return (
    <>
      <Banner  type={HomeTopicType.menu} />
      <MenuBody />
    </>
  );
};
