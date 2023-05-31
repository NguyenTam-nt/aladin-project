import { isUrl } from "@commons/index";
import React from "react";

type Props = {
  link?: string;
  name: string;
  size?: number;
};

export const Avatar = ({ link, name,  size = 40 }: Props) => {
  
  return (
    <div className="w-[40px] h-[40px] bg-secondary relative rounded-[50%] overflow-hidden flex items-center justify-center"
      style={{
      width: `${size}px`,
      height: `${size}px`
      }}
    >
      {isUrl(link + "") ? (
        <img
          src={link}
          alt=""
          className="absolute inset-0 rounded-[50%] object-cover"
          style={{
            width: `${size}px`,
            height: `${size}px`
            }}
        />
      ) : (
        <span className=" font-semibold text-_18 text-text_white uppercase"
          style={{
            fontSize: `${size > 60 ? 32 : 18}px`
          }}
        >{name.charAt(0) ?? ""}</span>
      )}
    </div>
  );
};
