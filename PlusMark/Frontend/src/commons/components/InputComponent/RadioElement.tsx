import { TickRound } from "@assets/icons";
import React, { useState } from "react";

interface Props {
  name: string;
  lable: string;
  isChecked?: boolean;
  handleChange?: () => void;
}
function RadioElement(props: Props) {
  const { name, lable, isChecked = false, handleChange } = props;
  return (
    <div className="">
      <label
        htmlFor={lable + name}
        className="radio-Active text-smal flex items-center cursor-pointer"
      >
        <input
          id={lable + name}
          name={name}
          checked={isChecked}
          onChange={(event) => {
            handleChange && handleChange();
          }}
          className="hidden"
          type="radio"
        />
        <div className="w-[18px] h-[18px] rounded-[50%] border border-gray-200 bg-white mr-[18px]">
          <TickRound />
        </div>
        {lable}
      </label>
    </div>
  );
}

export default RadioElement;
