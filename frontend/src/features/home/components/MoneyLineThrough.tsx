import { formatNumberDot } from "@commons/formatMoney";
import clsx from "clsx";
import React from "react";

export const MoneyLineThrough = ({ money, className = "" }: { money: number, className?:string }) => {
  return (
    <span className={clsx(`text-_12 lg:text-_14 font-normal text-text_A1A0A3 ${className}`)}>
      {" "}
      <span className="mx-1">/</span>{" "}
      <span className=" line-through">{formatNumberDot(money)}</span>
    </span>
  );
};
