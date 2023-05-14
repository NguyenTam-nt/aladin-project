import React from "react";

type Props = {
    title: string
}

export const GeneralTitle = ({title}:Props) => {
  return (
    <h2 className="text-text_primary text-[18px] xl:text-_24 font-semibold">
        {title}
    </h2>
  );
};
