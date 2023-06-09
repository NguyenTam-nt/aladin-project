import React from "react";

interface Props {
  itemInforCard: {
    description: string;
    timeString: string;
    img: string;
  };
}
const FoodReferialCard = (props: Props) => {
  const { itemInforCard } = props;
  const handleClickItem = (slug: string) => {
    console.log(slug, "đi đến trang chi tiết khuyến mãi");
  };
  return (
    <div
      onClick={() => {
        handleClickItem(itemInforCard.timeString);
      }}
      className="col-span-1 h-[176px] bg-white min-h-[302px] radius-tl-br cursor-pointer overflow-hidden"
    >
      <img
        src={itemInforCard.img || ""}
        alt="card"
        className="w-full min-h-[176px]"
      />
      <div className="py-6 px-4 ">
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

export default FoodReferialCard;
