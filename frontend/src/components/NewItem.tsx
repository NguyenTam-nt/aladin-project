import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  itemInforCard: {
    description: string;
    timeString: string;
    img: string;
  };
}
const NewItem = (props: Props) => {
  const navigate = useNavigate();
  const { itemInforCard } = props;
  const handleClickItem = (slug: string) => {
    navigate(`/tin-tuc/${slug}`);
  };
  return (
    <div
      onClick={() => {
        handleClickItem(itemInforCard.description);
      }}
      className="col-span-1 h-[176px] bg-white min-h-[302px] radius-tl-br cursor-pointer overflow-hidden"
    >
      <img
        src={itemInforCard.img || ""}
        alt="card"
        className="w-full max-h-[176px]"
      />
      <div className="py-6 px-4 min-h-[126px]">
        <p className="text-base font-semibold mb-1 text-GreyPrimary line-clamp-2">
          {itemInforCard.description}
        </p>
        <p className="text-sm leading-5 font-normal text-text_secondary">
          {itemInforCard.timeString}
        </p>
      </div>
    </div>
  );
};

export default NewItem;
