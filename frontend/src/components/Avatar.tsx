import React, { useMemo } from "react";

type Props = {
  name: string;
  size?: number;
};

export const Avatar = ({ name, size = 40 }: Props) => {
  const avatartext = useMemo(() => {
    const listText = name.split(" ")
    return listText?.[listText.length - 1]?.charAt(0)
  }, [name])
  return (
    <div
      className="w-[40px] h-[40px] bg-primary relative rounded-[50%] overflow-hidden flex items-center justify-center"
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <span
        className=" font-bold text-_18 text-text_white uppercase"
        style={{
          fontSize: `${size > 60 ? 32 : 20}px`,
        }}
      >
        {avatartext ||  ""}
      </span>
    </div>
  );
};
