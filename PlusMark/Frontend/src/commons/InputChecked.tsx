import { CircleFilledIcon } from "@assets/icons";
import React, { memo } from "react";

interface Props {
  checked: boolean;
  onChange: () => void;
  className?: string;
  lableText: string;
}
const InputChecked = memo(
  ({
    checked,
    lableText,
    className = "w-[18px] h-[18px]",
    onChange,
  }: Props) => {
    return (
      <label className="flex gap-1 items-center">
        <div>
          <input
            className="hidden"
            type="radio"
            checked={checked}
            onChange={onChange}
          />
          <div
            className={`hover:cursor-pointer aspect-square border-2 flex items-center justify-center rounded-full ${className} ${
              checked ? " border-main" : ""
            }`}
          >
            {checked && <CircleFilledIcon className="fill-main w-3/4 h-3/4" />}
          </div>
        </div>
        <span className="text-base font-normal"> {lableText}</span>
      </label>
    );
  }
);

export default InputChecked;
