import clsx from "clsx";
import React from "react";
import { HomeHeaderGroup } from "./HomeHeaderGroup";

type Props = {
    onPreClick?: () => void
    onNextClick?: () => void
    path?: string
    title: string
    children:React.ReactNode
    isPaddingTop?: boolean
}

export const HomeTopicLayout = ({children, onNextClick, onPreClick, title, path, isPaddingTop = false}:Props) => {
  return (
    <div className={clsx("w-rp pb-[40px] xl:pb-[120px]", {"py-[40px] xl:py-[120px]": isPaddingTop})}>
         <HomeHeaderGroup
          onPreClick={onPreClick}
          onNextClick={onNextClick}
          path={path}
          title={title}
        />
        {children}
    </div>
  );
};
