import React from "react";
import { HeaderAdmin } from "../HeaderAdmin";
import { FooterGroup } from "./components/FooterGroup";
import { FooterContact } from "./components/FooterContact";

const data = ["Đào tạo", "Sinh viên", "Thông tin"];

export const Footer = () => {
  return (
    <>
      <HeaderAdmin title="admin._footer._title" />
      {data.map((item, index) => {
        return <FooterGroup data={item} key={index} />;
      })}
      <FooterContact />
    </>
  );
};
