import { TranslateContext } from "@contexts/Translation";
import React, { useContext } from "react";
import { GeneralTitle } from "./GeneralTitle";
import type { IContent } from "@typeRules/content";

type Props = {
  data: IContent
  index: number
};

export const GeneralDetail = ({ data,index }: Props) => {
  const {isVn} = useContext(TranslateContext)
  return (
    <div className="mt-[32px]">
      <GeneralTitle title={`${index + 1}: ${isVn ? data?.title : data?.titleKo}`} />
      <div className="mt-[12px]">
        <div
          className="text-_14 text-_text-primary text-justify"
          dangerouslySetInnerHTML={{
            __html: isVn ? data?.content || "" : data?.contentKo || "",
          }}
        />
      </div>
    </div>
  );
};
