import { ICAdmin } from "@assets/icons/ICAdmin";
import { renderStar } from "@commons/common";
import { Avatar } from "@components/Avatar";
import type { IComment } from "@typeRules/comment";
import clsx from "clsx";
import React, { memo } from "react";

type Props = {
  commnets: IComment[];
};

export const MenuDetailComment = ({ commnets }: Props) => {
  return (
    <div className="mt-[40px] flex flex-col gap-y-[24px] lg:gap-y-[43px]">
      {commnets.map((item, index) => {
        return <CommentItem data={item} key={index} />;
      })}
    </div>
  );
};

export const CommentItem = memo(({ data }: { data: IComment }) => {
  return (
    <div>
      <div>
        <div className="flex items-center gap-x-[8px]">
          <Avatar name={data?.commentGuest?.fullname ?? ""} size={48} />
          <div>
            <div className="flex gap-x-[8px]">
              <span className="text-_16 font-semibold">
                {data?.commentGuest?.fullname ?? ""}
              </span>
              <div className="flex items-center gap-x-[6px]">
                {renderStar(Number(data.commentGuest?.rate ?? 0))}
              </div>
            </div>
            <span className="text-_12">
              {new Date(
                data?.commentGuest?.createdDate || ""
              ).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div
          className="mt-[19px] text-_14"
          dangerouslySetInnerHTML={{
            __html: data?.commentGuest?.content ?? "",
          }}
        />
      </div>
      {data.commentAdmin ? (
        <div className="mt-[24px] ml-[32px]">
          <div className="flex items-center gap-x-[8px]">
            <div
              className={clsx(
                "w-[48px] h-[48px]  relative rounded-[50%] overflow-hidden flex items-center justify-center bg-secondary"
              )}
            >
              <ICAdmin />
            </div>
            <div>
              <div className="flex gap-x-[8px]">
                <span className="text-_16 font-semibold">
                  {data?.commentAdmin?.fullname ?? ""}
                </span>
              </div>
              <span className="text-_12">
                {new Date(
                  data?.commentAdmin?.createdDate || ""
                ).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div
            className="mt-[19px] text-_14"
            dangerouslySetInnerHTML={{
              __html: data?.commentAdmin?.content ?? "",
            }}
          />
        </div>
      ) : null}
    </div>
  );
});
