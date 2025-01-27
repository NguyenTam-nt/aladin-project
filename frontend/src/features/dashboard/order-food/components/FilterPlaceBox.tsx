import { ICArowDown } from "@assets/icons/ICArowDown";
import { Colors } from "@constants/color";
import { Button } from "@features/dashboard/components/Button";
import { Checkbox } from "@features/dashboard/components/Checkbox";
import { useClickOutItem } from "@hooks/useClickOutItem";
import PlaceService from "@services/PlaceService";
import type { IResponseData } from "@typeRules/index";
import type { PlaceSelectType, PlaceType } from "@typeRules/place";
import React, { memo, useEffect, useState } from "react";

interface Props {
  handleChosePlace: (value: number | undefined) => void;
  place: undefined | number;
}
const FilterPlaceBox = memo(({ handleChosePlace, place }: Props) => {
  const { ref, isShow, handleToggleItem } = useClickOutItem();

  const [placeSelect, setPlaceSelect] = useState<PlaceSelectType[]>();

  useEffect(() => {
    getPlaceData();
  }, []);

  const getPlaceData = async () => {
    try {
      PlaceService.get_select()
        .then((response) => {
          setPlaceSelect(response);
        })
        .catch((error) => {});
    } catch (error) {}
  };

  return (
    <div ref={ref} className="relative">
      <Button
        onClick={handleToggleItem}
        text="common.filter_by_place"
        className="max-w-[120px] !text-_12 lg:!text-_14 lg:max-w-[177px] whitespace-nowrap"
        image={
          <span className="ml-1 lg:ml-2">
            <ICArowDown color={Colors.TrueBlue500} />
          </span>
        }
        color={"empty"}
      />

      <div
        className={
          "absolute top-[105%] right-0 min-w-[300%] bg-white overflow-y-auto list-facilities shadow-sm px-5 z-[9] " +
          (isShow ? "h-[200px]" : "h-0")
        }
      >
        <div className="flex h-[48px] items-center cursor-pointer">
          <div
            className={"w-3 h-3 rounded-[50%] " + (place ? "" : "bg-bg_01A63E")}
          ></div>

          <span
            onClick={() => handleChosePlace(undefined)}
            className="text-_14 text-GreyPrimary ml-[6px] "
          >
            Chọn tất cả
          </span>
        </div>
        {placeSelect &&
          placeSelect.map((item, index) => {
            {
              return (
                <div
                  onClick={() => handleChosePlace(item.id)}
                  key={index}
                  className="flex h-[48px] items-center cursor-pointer"
                >
                  <div
                    className={
                      "w-3 h-3 rounded-[50%] " +
                      (place === item.id ? "bg-bg_01A63E" : "")
                    }
                  ></div>
                  <span className="text-_14 text-GreyPrimary ml-[6px]">
                    {item.name}
                  </span>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
});

export default FilterPlaceBox;
