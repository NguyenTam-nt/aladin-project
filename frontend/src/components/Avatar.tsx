import React from "react";

type Props = {
  name: string;
  size?: number;
};

export const Avatar = ({ name, size = 40 }: Props) => {
  return (
    <div
      className="w-[40px] h-[40px] bg-primary relative rounded-[50%] overflow-hidden flex items-center justify-center"
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <span
        className=" font-semibold text-_18 text-text_white uppercase"
        style={{
          fontSize: `${size > 60 ? 32 : 18}px`,
        }}
      >
        {name.charAt(0) ?? ""}
      </span>
    </div>
  );
};
