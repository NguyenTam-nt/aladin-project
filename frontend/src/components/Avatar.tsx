import { isUrl } from "@commons/index";
import React from "react";

type Props = {
  link?: string;
  name: string;
};

export const Avatar = ({ link, name }: Props) => {
  return (
    <div className="w-[40px] h-[40px] bg-secondary  rounded-[50%] overflow-hidden flex items-center justify-center">
      {isUrl(link + "") ? (
        <img
          src={link}
          alt=""
          className="w-[40px] absolute inset-0 h-[48px] rounded-[50%] object-cover"
        />
      ) : (
        <span className=" font-semibold text-_18 text-text_white uppercase">{name.charAt(0) ?? ""}</span>
      )}
    </div>
  );
};
