import { commentService } from "@services/comment";
import type { ICommentDetail } from "@typeRules/comment";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { MenuDetailComment } from "./MenuDetailComment";
import { MenuDetailStar } from "./MenuDetailStar";
import { Button } from "@components/Button";
import { ICArowDown } from "@assets/icons/ICArowDown";
import { Colors } from "@constants/color";
import { Loading } from "@features/dashboard/components/Loading";

export const GroupStar = memo(() => {
  const [comment, setComment] = useState<ICommentDetail>();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const params = useParams();
  useEffect(() => {
    if (params?.id) {
      setLoading(true);
      commentService
        .getById({ page: 0, size: 4, sort: "id,desc" }, Number(params?.id))
        .then((data) => {
          setComment(data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [params?.id]);

  const totalPage = useMemo(() => {
    return Math.ceil(Number(comment?.listComment?.totalElementPage ?? 0) / 4);
  }, [comment?.listComment]);

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPage - 1) {
      setLoading(true);
      commentService
        .getById(
          { page: currentPage + 1, size: 4, sort: "id,desc" },
          Number(params?.id)
        )
        .then((data) => {
          if (data?.listComment && comment) {
            setComment({
              ...comment,
              listComment: {
                ...data.listComment,
                list: [...comment?.listComment.list, ...data.listComment.list],
              },
            });
          }
          setCurrentPage((p) => p + 1);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [totalPage, currentPage, comment]);

  return comment ? (
    <>
      <MenuDetailStar idParent={Number(params?.id)} data={comment} />
      <MenuDetailComment commnets={comment?.listComment?.list || []} />
      {loading ? <Loading /> : null}
      {totalPage > 1 && currentPage < totalPage - 1 ? (
        <Button
          onClick={handleNextPage}
          withAnimation={false}
          className="max-w-[173px] h-[26px] bg-transparent hover:underline"
          color="empty"
          text="menu.see_all_comment"
          image={
            <span className="ml-2">
              <ICArowDown color={Colors.primary} />
            </span>
          }
        />
      ) : null}
    </>
  ) : null;
});
