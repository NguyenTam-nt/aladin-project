import { Button } from "@components/Button";
import { Colors } from "@constants/color";
import React, { memo, useEffect, useMemo, useState } from "react";
import { TopicHistoryItem } from "./TopicHistoryItem";
import { SubHeaderTopic } from "@features/dashboard/home/components/SubHeaderTopic";
import { ICPlus } from "@assets/icons/ICPlus";
import type { IHistory } from "@typeRules/history";
import { usePagination } from "@features/dashboard/hooks/usePagination";
import { historySevice } from "@services/historyService";
import { PAGE_SIZE } from "@constants/contain";
import type { IResponseData } from "@typeRules/responsive";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loading } from "@components/Loading";

export const TopicHistory = () => {
  const [listHistories, setHistories] = useState<IResponseData<IHistory>>();
  const [isShow, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleShowHitory = () => {
    setShow(true);
  };
  const { currenPage, setCurrentPage } = usePagination();
  const handleSubmit = (data: IHistory) => {
    setHistories({
      total: listHistories?.total ?? 0,
      data: [data, ...(listHistories?.data ?? [])],
    });
  };

  const handleSubmitEdit = (data: IHistory) => {
    if (!listHistories) return;
    const newList = [...listHistories.data];
    const index = newList.findIndex((item) => item.id === data.id);
    newList.splice(index, 1, data);

    setHistories({
      total: listHistories?.total ?? 0,
      data: [...newList],
    });
  };

  const deleteHistory = (id: number) => {
    if (!listHistories) return;
    const newList = [...listHistories.data];
    const index = newList.findIndex((item) => item.id === id);
    newList.splice(index, 1);

    setHistories({
      total: listHistories?.total ?? 0,
      data: [...newList],
    });
  };

  useEffect(() => {
    getHistory(1);
  }, []);

  const getHistory = (page: number) => {
    setLoading(true);
    historySevice
      .get({ page: page - 1, size: PAGE_SIZE, sort: "id,desc" })
      .then((data) => {
        setHistories({
          total: data.total,
          data: [...(listHistories?.data ?? []), ...data.data],
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const totalPages = useMemo(() => {
    if (!listHistories?.total) return 0;
    return Math.ceil(listHistories?.total / PAGE_SIZE);
  }, [listHistories?.total]);

  const fechData = () => {
    if (Number(currenPage) <= totalPages) {
      getHistory(Number(currenPage) + 1);
      setCurrentPage((page) => Number(page) + 1);
    }
  };

  return (
    <div className="h-[700px] overflow-y-auto" id="scrollableDiv">
      <div className="flex items-center">
        <SubHeaderTopic title="admin._about._general._topic._history" />
        <Button
          onClick={handleShowHitory}
          imageLeft={
            <span className="mr-[12px]">
              <ICPlus color={Colors.secondary} />
            </span>
          }
          className="max-w-[170px] border border-secondary"
          text="button._create_post"
          color="empty"
        />
      </div>
      <div className="grid grid-cols-1 gap-y-[24px]">
        {isShow ? (
          <TopicHistoryItem onSubmit={handleSubmit} type="ADD" />
        ) : null}
      </div>
      <InfiniteScroll
        scrollableTarget="scrollableDiv"
        hasMore
        loader={loading ? <Loading /> : <></>}
        next={fechData}
        dataLength={listHistories?.data.length ?? 0}
        className="grid grid-cols-1 gap-y-[24px]"
      >
        <div className="grid grid-cols-1 gap-y-[24px]">
          <TopicHistoryList
            onEdit={handleSubmitEdit}
            onDeleteHistory={deleteHistory}
            data={listHistories?.data ?? []}
          />
        </div>
      </InfiniteScroll>
    </div>
  );
};

type PropsTopicHistoryList = {
  data: IHistory[];
  onEdit: (data: IHistory) => void;
  onDeleteHistory: (id: number) => void;
  isLoading?: boolean;
};

const TopicHistoryList = memo(
  ({ data, onEdit, onDeleteHistory }: PropsTopicHistoryList) => {
    return (
      <>
        {data.map((item) => {
          return (
            <TopicHistoryItem
              onDeleteHistory={onDeleteHistory}
              onSubmit={onEdit}
              data={item}
              key={item.id}
            />
          );
        })}
      </>
    );
  }
);
