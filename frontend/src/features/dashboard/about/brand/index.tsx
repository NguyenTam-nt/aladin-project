import { HeaderAdmin } from "@features/dashboard/components/HeaderAdmin";
import React from "react";
import { TopicPost } from "./components/TopicPost";
import { ContentType } from "@typeRules/content";

export const Brand = () => {
  return (
    <>
     <HeaderAdmin
            title='admin._about._brand._title'
        />
     <TopicPost type={ContentType.brand} />
    </>
  );
};
