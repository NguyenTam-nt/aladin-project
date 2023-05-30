import React, { useEffect, useState } from "react";
import { HeaderAdmin } from "../HeaderAdmin";
import { FooterGroup } from "./components/FooterGroup";
import { FooterContact } from "./components/FooterContact";
import type { IFooter } from "@typeRules/footer";
import { footerService } from "@services/footer";
import { useGetCategory } from "@features/dashboard/news/hooks/useGetCategory";
import { LoadingData } from "@components/LoadingData";

// const data = ["Đào tạo", "Sinh viên", "Thông tin"];

export const Footer = () => {
  const [data, setData] = useState<IFooter[]>([]);
  const [loading, setLoading] = useState(false);
  const { categories } = useGetCategory(100);

  useEffect(() => {
    setLoading(true);
    footerService
      .get()
      .then((data) => {
        console.log({ data });
        setData(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <HeaderAdmin title="admin._footer._title" />
      {loading ? (
        <div className="flex justify-center">
          <LoadingData />
        </div>
      ) : (
        data.map((item, index) => {
          return (
            <FooterGroup categories={categories} data={item} key={index} />
          );
        })
      )}
      <FooterContact />
    </>
  );
};
