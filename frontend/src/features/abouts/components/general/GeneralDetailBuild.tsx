import React from "react";
import { GeneralDetail } from "./GeneralDetail";
import { useGetContent } from "@features/abouts/useGetContent";
import { ContentType } from "@typeRules/content";

const GeneralDetailBuild = () => {
  const {data} = useGetContent(ContentType.general)
  return (
    <>
      {data.map((item, index) => {
        return (
          <GeneralDetail
            key={index}
            data={item} 
            index={index}          />
        );
      })}
    </>
  );
};

export default GeneralDetailBuild;
