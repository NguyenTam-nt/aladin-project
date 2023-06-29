import { ICArowDown } from "@assets/icons/ICArowDown";
import { ICDeleteX } from "@assets/icons/ICDeleteX";
import {
  formatNumberDot,
  formatNumberDotSlice,
  formatNumberDotWithVND,
} from "@commons/formatMoney";
import { Colors } from "@constants/color";
import clsx from "clsx";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./Button";
import { MoneyLineThrough } from "@features/home/components/MoneyLineThrough";
import { ICDeleteTrash } from "@assets/icons/ICDeleteTrash";
import { useClickOutItem } from "@hooks/useClickOutItem";
import { useNavigate } from "react-router-dom";
import { paths } from "@constants/routerPublic";
import { useCartContext } from "@contexts/hooks/order";
import type { IProduct } from "@typeRules/product";
import { debounce } from "lodash";

export const positionCart = {
  positionX: 0,
  positionY: 0,
};

export const MenusRight = () => {
  const { t } = useTranslation();
  // const [open, setOpen] = useState(false);
  const { listOrder } = useCartContext();
  const { ref, handleToggleItem, isShow, handleShow } = useClickOutItem();
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (ref.current) {
      positionCart.positionX = ref.current.getBoundingClientRect().left;
      positionCart.positionY = ref.current.getBoundingClientRect().top;
    }
  }, [ref]);

  const debouceTime = useRef<ReturnType<typeof debounce>>();

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(paths.orderFood.prefix);
  };

  useEffect(() => {
    if (listOrder.length && !isFirstRender.current) {
      if (debouceTime.current) debouceTime.current.cancel();
      debouceTime.current = debounce(() => {
        handleShow();
      }, 1000);
      debouceTime.current();
    }
    isFirstRender.current = false;
  }, [listOrder]);

  const totalPrice = useMemo(() => {
    return listOrder.reduce((currentValue, data) => {
      return (
        currentValue +
        Number(data?.pricePromotion ?? 0) * Number(data.quantity ?? 0)
      );
    }, 0);
  }, [listOrder]);

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
        className={
          "h-[40px] 2xl:h-[54px] w-[223px] absolute  origin-[top_right] right-[calc(100%_+_40px)]  2xl:right-[calc(100%_+_54px)] gap-x-2 rotate-[-90deg] text-_18 text-text_white flex font-iCielBC_Cubano items-center justify-center px-[24px] rounded-[0_16px_0_0] bg-secondary"
        }
      >
        <span className={clsx("rotate-[-180deg]", { "rotate-[0deg]": isShow })}>
          <ICArowDown color={Colors.text_white} />
        </span>
        {t("common.choosed_menu")}
      </button>
      <div className=" w-[calc(100vw_-_40px)] _420:w-[356px] flex flex-col py-[24px] h-[450px] md:h-[500px] 3xl:h-[644px] bg-primary">
        <div className="mx-[16px] py-[16px] flex justify-between items-center border-b border-br_E6E6E6">
          <span className="text-_18 font-iCielBC_Cubano text-secondary">
            {t("common.choosed_menu_title")}
          </span>
          <button onClick={handleToggleItem}>
            <ICDeleteX />
          </button>
        </div>
        {listOrder.length ? (
          <>
            <div className="flex-1 w-full px-[16px] overflow-y-auto list-facilities">
              {listOrder.map((data, index) => {
                return <MenuItem data={data} key={index} />;
              })}
            </div>
            <div className="px-[16px] flex flex-col gap-y-[16px]">
              <div className="flex items-center justify-between mt-[16px]">
                <span className="text-_14 text-text_white">Tổng giá trị</span>
                <span className="text-_16 font-semibold text-secondary">
                  {formatNumberDotWithVND(totalPrice)}
                </span>
              </div>
              <Button
                onClick={handleNavigate}
                classNameParent="!w-full"
                className="bg-secondary w-full"
                color="primary"
                text="Đặt đơn hàng này"
              />
            </div>
          </>
        ) : (
          <div className="flex justify-center mt-5">
            Giỏ hàng của bạn đang rỗng.
          </div>
        )}
      </div>
    </div>
  );
};

type Props = {
  data: IProduct;
};

const MenuItem = ({ data }: Props) => {
  const { handlePlusCart, handleMinusCart, handleDeleteCart } =
    useCartContext();
  const handleMinusCount = () => {
    handleMinusCart(Number(data.id), 1);
  };

  const handlePlusCount = () => {
    handlePlusCart(data, 1, { top: 0, left: 0 });
  };

  const handleDelete = () => {
    handleDeleteCart(Number(data.id));
  };

  // {formatNumberDotSlice(Number(data?.pricePromotion))}
  // {(data?.pricePromotion !== data?.price && data?.pricePromotion.toString().length <= 8) ? (
  //   <MoneyLineThrough money={Number(data?.price)} />
  // ) : null}

  return (
    <div className="flex items-center gap-x-[16px] py-[16px]">
      <div>
        <img
          className="min-w-[80px] object-cover w-[80px] min-h-[80px] max-h-[80px] h-[80px] rounded-[16px_0_16px_0]"
          alt=""
          src={data.linkMedia}
        />
      </div>
      <div className="flex-1">
        <p className=" line-clamp-1">{data.name}</p>
        <div className="flex items-center">
          <span className="text-_14 font-semibold text-secondary">
            {formatNumberDotSlice(Number(data.pricePromotion))}
          </span>
          {data?.pricePromotion !== data?.price &&
          data?.pricePromotion.toString().length <= 8 ? (
            <MoneyLineThrough
              money={Number(data.price)}
              className="!text-_12 text-text_white"
            />
          ) : null}
        </div>
        <div className="flex items-center self-center flex-1 gap-x-[16px] text-text_white text-_13 font-semibold">
          <button
            onClick={handleMinusCount}
            className="text-_24 w-[30px] h-[30px]  flex items-center justify-center hover:shadow-sm rounded"
          >
            −
          </button>
          <span className=" break-words">{data.quantity}</span>
          <button
            onClick={handlePlusCount}
            className="text-_24 w-[30px] h-[30px] flex items-center justify-center hover:shadow-sm rounded"
          >
            +
          </button>
        </div>
      </div>
      <button onClick={handleDelete}>
        <ICDeleteTrash />
      </button>
    </div>
  );
};
