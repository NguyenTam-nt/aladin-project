import { HeaderAdmin } from "@features/dashboard/components/HeaderAdmin";
import React from "react";
import { TopicPost } from "../brand/components/TopicPost";
import { ContentType } from "@typeRules/content";

export const Structure = () => {
  return (
    <>
      <HeaderAdmin title="admin._about._structure._title" />
      <TopicPost type={ContentType.structure} />
    </>
  );
};
