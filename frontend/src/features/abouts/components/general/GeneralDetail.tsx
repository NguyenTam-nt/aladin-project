import React from "react";
import { GeneralTitle } from "./GeneralTitle";

type Props = {
  title: string;
  content: string;
};

export const GeneralDetail = ({ title, content }: Props) => {
  return (
    <div className="mt-[32px]">
      <GeneralTitle title={title} />
      <div className="mt-[12px]">
        <div
          className="text-_14 text-_text-primary text-justify"
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </div>
    </div>
  );
};
