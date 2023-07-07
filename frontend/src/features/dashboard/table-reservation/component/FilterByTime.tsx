import CalendarIcont from "@assets/icons/CalendarIcont";
import { Button } from "@features/dashboard/components/Button";
import { useClickOutItem } from "@hooks/useClickOutItem";
import React, { ChangeEvent, memo, useEffect, useRef } from "react";
interface Props {
  time: string;
  handleFilterByTime: (value: string) => void;
}
const FilterByTime = memo(({ time, handleFilterByTime }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChangeTime = (e: ChangeEvent<HTMLInputElement>) => {
    handleFilterByTime(e.target.value);
  };
  const handleClick = () => {
    inputRef?.current?.showPicker();
  };
  return (
    <div className="relative">
      <Button
        onClick={handleClick}
        text="common.filter_by_date"
        className="max-w-[120px] !text-_12 xl:!text-_14 xl:max-w-[177px] whitespace-nowrap z-[9]"
        image={
          <span className="ml-1 xl:ml-2">
            <CalendarIcont />
          </span>
        }
        color={"empty"}
      />
      <input
        ref={inputRef}
        defaultValue={time}
        type="date"
        className="absolute bottom-0 -z-10 bg-transparent"
        onChange={handleChangeTime}
      />
    </div>
  );
});

export default FilterByTime;
