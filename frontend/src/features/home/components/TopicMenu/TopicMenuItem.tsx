import React, { memo, useState } from "react";
import { DiscountItem } from "../DiscountItem";
import { formatNumberDot } from "@commons/formatMoney";
import { MoneyLineThrough } from "../MoneyLineThrough";
import { Button } from "@components/Button";
import { Link } from "react-router-dom";
import { paths } from "@constants/routerPublic";
// import { AnimatedSmoke } from "@components/AnimatedSmoke";

export const TopicMenuItem = memo(() => {
  const [count, setCount] = useState(1);
  const handleMinusCount = () => {
    if (count <= 1) return;
    setCount((count) => count - 1);
  };

  const handlePlusCount = () => {
    // if(count <= 1) return
    setCount((count) => count + 1);
  };

  return (
    <div className="relative parentSmoker">
      {/* <AnimatedSmoke /> */}
      <div className="radius-tl-br hover:shadow-xl menu-item duration-200 ease-linear flex flex-col overflow-hidden relative h-[370px] lg:h-[492px] max-h-auto bg-white">
        <DiscountItem discount={30} />
        <Link
          to={`${paths.memu.prefix}/${1234}`}
          className="h-[160px] lg:h-[312px] w-full relative"
        >
          <img
            className="w-full h-full"
            src="https://s3-alpha-sig.figma.com/img/579d/3c95/b57c670f37f72c0fd934419fc49f5a78?Expires=1687132800&Signature=nnB5CB3xuAgNPpmhie8~qiYxBhx2gBNPCORP~y6pJklisKnI1mGxwbu8ecp9jf6w88kxp84QAD1F5HNG60U8Ikwr7IQT-Y6-QEAP6b8Lzr4XhpG8QSGD7hAZEFx~h70EIZaEyqUgKoIceRr-X2TqwjoszAIdbv2tEj-0e2fvLWLvyDOOr1W~iIve8c55WBE6yQSIGIt2Huupy239CUsVmZmFA1GhhdbAjmjH0bZbGmXCby8ZJgj6jSJl4dVoRT~0ZxU8noZrL6QW75fQ-ETmQcGY2Yxyn3dabj~-E5kysOqAfi3WyLgqnIdzXKZsDqXs~nEhXspHWWC9B~1sT9~bIA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            alt=""
          />
        </Link>
        <div className="p-[16px] flex-1 flex flex-col">
          <p className="text-GreyPrimary text-_14 lg:text-_16 font-semibold line-clamp-3 lg:line-clamp-2">
            Combo 2 Người lớn ăn thả ga không lo hết món
          </p>
          <p className="text-_16 lg:text-_18 font-bold mt-2 text-secondary">
            {formatNumberDot(600000)}
            <MoneyLineThrough money={800000} />
          </p>
          <div className="flex flex-col lg:flex-row flex-1 lg:max-h-[48px] justify-between items-end mt-auto gap-x-[16px]">
            <div className="flex items-center self-start  lg:self-center flex-1 gap-x-[16px] text-GreyPrimary text-_14 lg:font-semibold">
              <button
                onClick={handleMinusCount}
                className="text-_18 lg:text-_24 w-[30px] h-[30px]  flex items-center justify-center hover:shadow-sm rounded"
              >
                −
              </button>
              <span className=" break-words">{count}</span>
              <button
                onClick={handlePlusCount}
                className="text-_18 lg:text-_24 w-[30px] h-[30px] flex items-center justify-center hover:shadow-sm rounded"
              >
                +
              </button>
            </div>
            <div className="w-full lg:w-[167px]">
              <Button
                text="Thêm vào giỏ"
                classNameParent="min-w-full lg:w-none"
                className="min-w-full lg:min-w-[167px] !h-[40px] lg:!h-[48px] !text-_14 font-bold"
                color="primary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
