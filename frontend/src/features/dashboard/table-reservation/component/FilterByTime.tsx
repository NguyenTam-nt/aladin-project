import CalendarIcont from "@assets/icons/CalendarIcont";
import { Button } from "@features/dashboard/components/Button";
import { useClickOutItem } from "@hooks/useClickOutItem";
import React, { ChangeEvent, memo, useEffect, useRef } from "react";

const FilterByTime = memo(() => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChangeTime = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value, "filer by time");
  };
  const handleClick = () => {
    inputRef?.current?.showPicker();
  };
  return (
    <div className="relative">
      <Button
        onClick={handleClick}
        text="common.filter_by_date"
        className="max-w-[177px] whitespace-nowrap z-[9]"
        image={
          <span className="ml-2">
            <CalendarIcont />
          </span>
        }
        color={"empty"}
      />
      <input
        ref={inputRef}
        defaultValue={new Date().toLocaleString()}
        type="date"
        className="absolute bottom-0 -z-10 bg-transparent"
        onChange={handleChangeTime}
      />
    </div>
  );
});

export default FilterByTime;
