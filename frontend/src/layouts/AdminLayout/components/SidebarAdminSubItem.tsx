import { TranslateContext } from "@contexts/Translation";
import clsx from "clsx";
import React, { useContext } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

type PropSidebarAdminSubItem = {
  index: number;
  path: string;
  name: string;
};

export const SidebarAdminSubItem = ({
  index,
  path,
  name,
}: PropSidebarAdminSubItem) => {
  const { t } = useContext(TranslateContext);
  const resolved = useResolvedPath(path);
  const match = useMatch({ path: resolved.pathname, end: true });
  return (
    <Link
      to={path}
      className="h-[32px] flex  items-center pl-[45px]"
      key={index}
    >
      <span className={clsx("ml-2 text-_16", { "text-secondary font-bold": !!match })}>
        {t(name)}
      </span>
      {!!match ? (
        <div
          className={clsx(
            "absolute top-0 w-[30px] left-[12px] border-b-[1px] border-l-[1px] border-dotted border-secondary"
          )}
          style={{
            height: 32 * (index + 1) - 16,
          }}
        />
      ) : null}
    </Link>
  );
};
