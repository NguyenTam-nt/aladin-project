import { FomatDateYY_MM_DD } from "@constants/formatDateY_M_D";
import { paths } from "@constants/routerPublic";
import type { newItem_type } from "@typeRules/new";
import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  itemNew: newItem_type;
}
const NewItem = ({ itemNew }: Props) => {
  const navigate = useNavigate();
  const handleClickItem = (id: number) => {
    navigate(`${paths.news.prefix}/${id}`);
  };
  return (
    <div
      onClick={() => {
        handleClickItem(itemNew.id!);
      }}
      className="col-span-1 h-[176px] bg-white min-h-[302px] radius-tl-br cursor-pointer overflow-hidden"
    >
      <img
        src={itemNew.linkMedia || ""}
        alt="card"
        className="w-full max-h-[176px]"
      />
      <div className="py-6 px-4 min-h-[126px]">
        <p className="text-base font-semibold mb-1 text-GreyPrimary line-clamp-2">
          {itemNew.description}
        </p>
        <p className="text-sm leading-5 font-normal text-text_secondary">
          {FomatDateYY_MM_DD(itemNew.createdDate!)}
        </p>
      </div>
    </div>
  );
};

export default NewItem;
