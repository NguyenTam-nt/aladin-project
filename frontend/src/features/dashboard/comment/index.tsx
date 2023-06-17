import clsx from "clsx";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "../components/Button";
import { ICFilter } from "@assets/icons/ICFilter";
import { ICArowDown } from "@assets/icons/ICArowDown";
import { Colors } from "@constants/color";
import { TitleTopic } from "../home/components/TitleTopic";
import { useTranslation } from "react-i18next";
import { CommentItem } from "./components/CommentItem";
import InfiniteScroll from "react-infinite-scroll-component";

const filters = [
  {
    id: "all",
    name: "Tất cả",
  },
  {
    id: "cd",
    name: "Chờ duyệt",
  },
  {
    id: "dd",
    name: "Đã duyệt",
  },
];

export const CommentAdmin = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParam] = useSearchParams();
  const [currentFilter, setCurrentFilter] = useState(
    searchParams.get("type") || "all"
  );

  const setFilter = (filter: string) => {
    setSearchParam({
      type: filter,
    });
    setCurrentFilter(filter);
  };
  return (
    <>
      <div className="flex border-b border-br_D9D9D9 items-center gap-x-[32px]">
        {filters.map((item, index) => {
          return (
            <button
              onClick={() => setFilter(item.id)}
              className={clsx(
                "pb-2 text-_14 border-b-2 border-transparent cursor-pointer",
                {
                  "text-TrueBlue_500 font-bold  !border-TrueBlue_500":
                    item.id === currentFilter,
                }
              )}
              key={index}
            >
              {item.name}
            </button>
          );
        })}
      </div>
      <div className="mt-[40px]">
        <TitleTopic isRequired={false} name="adminComment.title" />
      </div>
      <div className="flex justify-end">
        <Button
          // onClick={handleNavigation}
          className="max-w-[201px] !justify-start"
          text="Mới nhất"
          imageLeft={
            <span className="mr-[10px]">
              <ICFilter />
            </span>
          }
          image={
            <span className=" flex-1 flex justify-end">
              <ICArowDown color={Colors.TrueBlue500} />
            </span>
          }
          color={"empty"}
        />
      </div>
      <div className="mt-[24px]" id="comment-admin-scroll">
        <InfiniteScroll
          hasMore
          loader={"loading..."}
          next={() => {}}
          dataLength={8}
          scrollableTarget="comment-admin-scroll"
        >
          <div>
            <CommentItem />
            <CommentItem />
            <CommentItem />
            <CommentItem />
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
};
