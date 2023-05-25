import { HeaderAdmin } from "@features/dashboard/components/HeaderAdmin";
import React from "react";
import { TopicPost } from "./components/TopicPost";

export const Brand = () => {
  return (
    <>
     <HeaderAdmin
            title='admin._about._brand._title'
        />
     <TopicPost />
    </>
  );
};
