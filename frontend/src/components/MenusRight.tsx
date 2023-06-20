import { ICArowDown } from "@assets/icons/ICArowDown";
import { ICDeleteX } from "@assets/icons/ICDeleteX";
import { formatNumberDot, formatNumberDotWithVND } from "@commons/formatMoney";
import { Colors } from "@constants/color";
import clsx from "clsx";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./Button";
import { MoneyLineThrough } from "@features/home/components/MoneyLineThrough";
import { ICDeleteTrash } from "@assets/icons/ICDeleteTrash";
import { useClickOutItem } from "@hooks/useClickOutItem";

export const MenusRight = () => {
  const { t } = useTranslation();
  // const [open, setOpen] = useState(false);
  const { ref, handleToggleItem, isShow } = useClickOutItem();
  // const handleOpen = () => {
  //   setOpen(!open);
  // };
  return (
    <div
      ref={ref}
      className={clsx(
        "flex  absolute z-[2] top-[-247px] ease-in-out duration-300",
        {
          "right-[calc(-100vw_+_40px)] _420:right-[-356px]": !isShow,
          "right-0": isShow,
        }
      )}
    >
      <button
        onClick={handleToggleItem}
        className="h-[40px] 2xl:h-[54px] w-[223px] absolute  origin-[top_right] right-[calc(100%_+_40px)]  2xl:right-[calc(100%_+_54px)] gap-x-2 rotate-[-90deg] text-_18 text-text_white flex font-iCielBC_Cubano items-center justify-center px-[24px] rounded-[0_16px_0_0] bg-secondary"
      >
        <ICArowDown color={Colors.text_white} />
        {t("common.choosed_menu")}
      </button>
      <div className=" w-[calc(100vw_-_40px)] _420:w-[356px] flex flex-col py-[24px] h-[450px] md:h-[550px] 2xl:h-[644px] bg-primary">
        <div className="mx-[16px] py-[16px] flex justify-between items-center border-b border-br_E6E6E6">
          <span className="text-_18 font-iCielBC_Cubano text-secondary">
            {t("common.choosed_menu_title")}
          </span>
          <button onClick={handleToggleItem}>
            <ICDeleteX />
          </button>
        </div>
        <div className="flex-1 w-full px-[16px] overflow-y-auto list-facilities">
          {[1, 2, 3, 4, 5].map((_, index) => {
            return <MenuItem key={index} />;
          })}
        </div>
        <div className="px-[16px] flex flex-col gap-y-[16px]">
          <div className="flex items-center justify-between mt-[16px]">
            <span className="text-_14 text-text_white">Tổng giá trị</span>
            <span className="text-_16 font-semibold text-secondary">
              {formatNumberDotWithVND(2500000)}
            </span>
          </div>
          <Button
            classNameParent="!w-full"
            className="bg-secondary w-full"
            color="primary"
            text="Đặt đơn hàng này"
          />
        </div>
      </div>
    </div>
  );
};

const MenuItem = () => {
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
    <div className="flex items-center gap-x-[16px] py-[16px]">
      <div>
        <img
          className="min-w-[80px] w-[80px] min-h-[80px] max-h-[80px] h-[80px] rounded-[16px_0_16px_0]"
          alt=""
          src="https://s3-alpha-sig.figma.com/img/dfa5/fd5f/6cf0d2f39532ffece833fa5acb9d1d4b?Expires=1687737600&Signature=mKBxcSR6B8XCG4zaZGDG5z1pF9YeyHi1b2Rmg8-kbyv-SI3W0-oqanhuyLMfH1PrNUtTF7A6CzUPpdNcPLVf599BUnBHYOrudv7kBWD6oNrtYWww2AMIdV2cYDJOQoBmqz7PYHYB30Zsf~-NCo8LIMaie~0MSuEI~cvG3vS0RPWm9qGS3MsTDhF4UK13TqY2ODbsr97x6eOjrDBqvZEw7Y5j8Acyg5PWP572-dPn4EBrqD1-Fn8-GIiN82IV3UKUKHUyANfe8CMYZ7rikhq61H8oEHUK2z6HyoJ~q3kLA3gtHX7eW50aMtCGMPWsx6q4QTkcqwplXrUGXG8IDke~NQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
        />
      </div>
      <div>
        <p className=" line-clamp-1">
          Combo 2 Người lớn ăn thả ga không lo hết món
        </p>
        <div className="flex items-center">
          <span className="text-_14 font-semibold text-secondary">
            {formatNumberDot(600000)}
          </span>
          <MoneyLineThrough
            money={800000}
            className="text-_12 text-text_white"
          />
        </div>
        <div className="flex items-center self-center flex-1 gap-x-[16px] text-text_white text-_13 font-semibold">
          <button
            onClick={handleMinusCount}
            className="text-_24 w-[30px] h-[30px]  flex items-center justify-center hover:shadow rounded"
          >
            −
          </button>
          <span className=" break-words">{count}</span>
          <button
            onClick={handlePlusCount}
            className="text-_24 w-[30px] h-[30px] flex items-center justify-center hover:shadow rounded"
          >
            +
          </button>
        </div>
      </div>
      <button>
        <ICDeleteTrash />
      </button>
    </div>
  );
};
