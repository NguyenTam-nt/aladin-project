import { formatNumberDot } from "@commons/formatMoney";
import React from "react";

export const MoneyLineThrough = ({ money }: { money: number }) => {
  return (
    <span className="text-_14 text-text_A1A0A3">
      {" "}
      <span className="mx-1">/</span>{" "}
      <span className=" line-through">{formatNumberDot(money)}</span>
    </span>
  );
};
