import CalendarIcont from "@assets/icons/CalendarIcont";
import { Button } from "@features/dashboard/components/Button";
import { useClickOutItem } from "@hooks/useClickOutItem";
import React, { ChangeEvent, memo, useEffect, useRef } from "react";

const FilterByTime = memo(() => {
  const { ref, isShow, handleToggleItem } = useClickOutItem();
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChangeTime = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value, "filer by time");
  };
  useEffect(() => {
    if (isShow && inputRef.current) {
      inputRef.current.checked;
      console.log([inputRef.current]);
      console.log("click");
    }
    return () => {
      inputRef.current?.removeEventListener("change", () => {});
    };
  }, [isShow]);
  return (
    <label htmlFor="a" ref={ref} className="relative">
      <Button
        onClick={handleToggleItem}
        text="common.filter_by_date"
        className="max-w-[177px] whitespace-nowrap"
        image={
          <span className="ml-2">
            <CalendarIcont />
          </span>
        }
        color={"empty"}
      />
      <input
        id="a"
        ref={inputRef}
        defaultValue={new Date().toLocaleString()}
        type="date"
        // className="hidden"
        onChange={handleChangeTime}
      />
    </label>
  );
});

export default FilterByTime;
