import { TranslateContext } from "@contexts/Translation";
import React, { useContext } from "react";
import { GeneralTitle } from "./GeneralTitle";

type Props = {
  data: {
    title_vn: string;
    title_ko: string
    content_vn: string;
    content_ko: string
  };
};

export const GeneralDetail = ({ data }: Props) => {
  const {isVn} = useContext(TranslateContext)
  return (
    <div className="mt-[32px]">
      <GeneralTitle title={isVn ? data.title_vn : data.title_ko} />
      <div className="mt-[12px]">
        <div
          className="text-_14 text-_text-primary text-justify"
          dangerouslySetInnerHTML={{
            __html: isVn ? data.content_vn : data.content_ko,
          }}
        />
      </div>
    </div>
  );
};
