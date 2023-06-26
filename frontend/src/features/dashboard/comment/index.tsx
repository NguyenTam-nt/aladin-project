import clsx from "clsx";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "../components/Button";
import { ICFilter } from "@assets/icons/ICFilter";
import { ICArowDown } from "@assets/icons/ICArowDown";
import { Colors } from "@constants/color";
import { TitleTopic } from "../home/components/TitleTopic";
import { useTranslation } from "react-i18next";
import { CommentItem } from "./components/CommentItem";
import InfiniteScroll from "react-infinite-scroll-component";
import { useClickOutItem } from "@hooks/useClickOutItem";
import { useSearchParamHook } from "@hooks/useSearchParam";
import type { IComment, ICommentChild } from "@typeRules/comment";
import { commentService } from "@services/comment";
import { SIZE_DATA } from "@constants/index";
import { Loading } from "../components/Loading";

const filters = [
  {
    id: "all",
    slug: undefined,
    name: "Tất cả",
  },
  {
    id: "false",
    slug: "false",
    name: "Chờ duyệt",
  },
  {
    id: "true",
    slug: "true",
    name: "Đã duyệt",
  },
];

const filtersNew = [
  {
    id: "createdDate,desc",
    slug: "moi-nhat",
    name: "Mới nhất",
  },
  {
    id: "createdDate,asc",
    slug: "cu-nhat",
    name: "Cũ nhất",
  },
];

export const CommentAdmin = () => {
  const { searchParams, setQueries } = useSearchParamHook();
  const [comments, setComments] = useState<IComment[]>([]);
  const [total, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { ref, isShow, handleToggleItem } = useClickOutItem();

  const [currentFilter, setCurrentFilter] = useState(
    searchParams.get("type") ?? "all"
  );

  const [sort, setSort] = useState(searchParams.get("sort") ?? "moi-nhat");

  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    getComments(0, currentFilter, sort);
    setCurrentPage(0);
  }, [currentFilter, sort]);

  const totalPages = useMemo(() => {
    return Math.ceil(total / SIZE_DATA);
  }, [total]);

  const getComments = useCallback(
    (page: number, status: string, sort: string) => {
      setLoading(true);
      commentService
        .get({
          sort: filtersNew.find((i) => i.slug === sort)?.id,
          page,
          size: 12,
          status: filters.find((i) => i.id === status)?.slug,
        })
        .then((data) => {
          setComments([...data.list]);
          setTotalPage(data.totalElementPage);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [comments]
  );

  const getCommentsMore = useCallback(
    (page: number, status: string, sort: string) => {
      setLoading(true);
      commentService
        .get({
          sort: filtersNew.find((i) => i.slug === sort)?.id,
          page,
          size: 12,
          status: filters.find((i) => i.id === status)?.slug,
        })
        .then((data) => {
          setComments([...comments, ...data.list]);
          setTotalPage(data.totalElementPage);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [comments]
  );

  const fechData = () => {
    // if(isAll) return
    if (currentPage <= totalPages) {
      getCommentsMore(currentPage + 1, currentFilter, sort);
      setCurrentPage((page) => page + 1);
    }
  };

  const setFilter = (filter: string) => {
    setQueries("type", filter);
    setCurrentFilter(filter);
  };

  const handleSort = (index: number) => {
    setSort(filtersNew[index].slug);
    setQueries("sort", filtersNew[index].slug);
  };

  const handleEdit = useCallback(
    (data: ICommentChild) => {
      const newData = [...comments];
      const index = newData.findIndex((item) => item.id === data.idParent);
      if (index !== -1) {
        newData[index].commentAdmin = data;
        setComments([...newData]);
      }
    },
    [comments]
  );

  const handleDelete = useCallback(
    (id: number) => {
      const newData = [...comments];
      const index = newData.findIndex((item) => item.id === id);
      if(index !== -1) {
        newData.splice(index, 1);
        setComments([...newData]);
      }
    },
    [comments]
  );

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
              key={item.id}
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
        <div ref={ref} className="relative">
          <Button
            onClick={handleToggleItem}
            className="min-w-[201px] !justify-start"
            text={filtersNew.find((item) => item.slug === sort)?.name || ""}
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
          <div
            className={clsx(
              " absolute top-[100%] right-0 w-[201px] z-[3]  overflow-hidden ease-in duration-300 h-0 bg-white shadow-lg",
              {
                "footer-animation-list": isShow,
              }
            )}
            style={{
              ["--footer-size" as string]: filtersNew.length,
              ["--height-li" as string]: "38px",
            }}
          >
            {filtersNew.map((item, index) => {
              const active = item.id === sort;
              return (
                <button
                  onClick={() => handleSort(index)}
                  key={item.id}
                  className={clsx(
                    " hover:bg-slate-100 w-full h-[38px] flex items-center px-[16px] ",
                    { "bg-slate-100": active }
                  )}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mt-[24px]" id="comment-admin-scroll">
        <InfiniteScroll
          hasMore
          loader={
            loading ? (
              <div className="flex items-center justify-center">
                <Loading />
              </div>
            ) : (
              <></>
            )
          }
          next={fechData}
          dataLength={comments.length}
          scrollableTarget="comment-admin-scroll"
        >
          <div>
            {comments.map((item) => {
              return (
                <CommentItem
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  data={item}
                  key={item.id}
                />
              );
            })}
            {/* <CommentItem />
            <CommentItem />
            <CommentItem /> */}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
};
