import { ICArowDown } from "@assets/icons/ICArowDown";
import { ICStar } from "@assets/icons/ICStar";
import { renderStar } from "@commons/common";
import { Avatar } from "@components/Avatar";
import { Button } from "@components/Button";
import { Colors } from "@constants/color";
import React, { memo } from "react";

const listComments = [
  {
    name: "Hoàng Minh Châu",
    date: "24/12/2023",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt est, sapiente ut beatae vitae in officia nostrum  ducimus nobis et odit, enim iure? Obcaecati incidunt dolore quisquam molestiae minus.",
    rating: 3,
  },
  {
    name: "Phạm Linh Nhi",
    date: "24/12/2023",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt est, sapiente ut beatae vitae in officia nostrum  ducimus nobis et odit, enim iure? Obcaecati incidunt dolore quisquam molestiae minus.",
    rating: 2,
  },
  {
    name: "Nhật Long Hoàng",
    date: "24/12/2023",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt est, sapiente ut beatae vitae in officia nostrum  ducimus nobis et odit, enim iure? Obcaecati incidunt dolore quisquam molestiae minus.",
    rating: 5,
  },
];

export const MenuDetailComment = () => {
  return (
    <div className="mt-[40px] flex flex-col gap-y-[43px]">
      {listComments.map((item, index) => {
        return <CommentItem data={item} key={index} />;
      })}
      <Button className="max-w-[173px] h-[26px] bg-transparent hover:shadow" color="empty" text="menu.see_all_comment" image={<span className="ml-2"><ICArowDown color={Colors.primary} /></span>} />
    </div>
  );
};

export const CommentItem = memo(
  ({
    data,
  }: {
    data: {
      name: string;
      rating: number;
      date: string;
      comment: string;
    };
  }) => {
    return (
      <div>
        <div className="flex items-center gap-x-[8px]">
          <Avatar name={data.name} size={48} />
          <div>
            <div className="flex gap-x-[8px]">
              <span className="text-_16 font-semibold">{data.name}</span>
              <div className="flex items-center gap-x-[6px]">
                {renderStar(data.rating)}
              </div>
            </div>
            <span className="text-_12">{data.date}</span>
          </div>
        </div>
        <div
          className="mt-[19px]"
          dangerouslySetInnerHTML={{
            __html: data.comment,
          }}
        />
      </div>
    );
  }
);
