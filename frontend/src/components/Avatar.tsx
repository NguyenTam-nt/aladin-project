import clsx from "clsx";
import React, { useMemo } from "react";

type Props = {
  url?: string;
  name: string;
  size?: number;
};

export const Avatar = ({ url, name, size = 40 }: Props) => {
  const avatartext = useMemo(() => {
    const listText = name.split(" ");
    return listText?.[listText.length - 1]?.charAt(0);
  }, [name]);
  return (
    <div
      className={clsx(
        "w-[40px] h-[40px]  relative rounded-[50%] overflow-hidden flex items-center justify-center",
        {
          "bg-primary": !url,
        }
      )}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      {url ? (
        <img
          src={url}
          className="z-[1] absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <span
          className=" font-bold text-_18 text-text_white uppercase"
          style={{
            fontSize: `${size > 60 ? 32 : 20}px`,
          }}
        >
          {avatartext || ""}
        </span>
      )}
    </div>
  );
};
