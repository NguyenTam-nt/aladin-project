import { ICArowDown } from "@assets/icons/ICArowDown";
import { Colors } from "@constants/color";
import { Button } from "@features/dashboard/components/Button";
import { Checkbox } from "@features/dashboard/components/Checkbox";
import { useClickOutItem } from "@hooks/useClickOutItem";
import PlaceService from "@services/PlaceService";
import type { PlaceType } from "@typeRules/place";
import React, { memo, useState, UIEvent, useEffect } from "react";
type PropsItem = { id: number; name: string } | null;

interface Props {
  handleChosePlace: (value: PropsItem) => void;
  place: PropsItem;
}
const FilterPlaceBox = memo(({ handleChosePlace, place }: Props) => {
  const { ref, isShow, handleToggleItem } = useClickOutItem();
  const [listPlaces, setListPlace] = useState<PlaceType[]>([]);
  const [currenPage, setCurrenPage] = useState<number>(1);
  const [totaPage, setTotaPages] = useState<number>(1);
  const getListPlace = async (currenPage: number) => {
    try {
      const { list, totalElement, totalElementPage } = await PlaceService.get({
        page: currenPage,
        size: 20,
        sort: "id,desc",
      });
      setListPlace([...listPlaces, ...list]);
      setTotaPages(Math.ceil(totalElementPage / 20));
    } catch (error) {}
  };
  const handleScroolGetPlace = (e: UIEvent<HTMLDivElement>) => {
    const scroolTop = e.currentTarget.scrollTop;
    const clientHeight = e.currentTarget.clientHeight;
    const scrollHeight = e.currentTarget.scrollHeight;
    if (scroolTop + clientHeight >= scrollHeight && totaPage < totaPage) {
      setCurrenPage((preState) => preState + 1);
    }
  };
  useEffect(() => {
    getListPlace(currenPage);
  }, [currenPage]);
  return (
    <div ref={ref} className="relative">
      <Button
        onClick={handleToggleItem}
        text="common.filter_by_place"
        className="max-w-[177px] whitespace-nowrap"
        image={
          <span className="ml-2">
            <ICArowDown color={Colors.TrueBlue500} />
          </span>
        }
        color={"empty"}
      />

      <div
        onScroll={handleScroolGetPlace}
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
            onClick={() => handleChosePlace(null)}
            className="text-_14 text-GreyPrimary ml-[6px] "
          >
            Chọn tất cả
          </span>
        </div>
        {listPlaces.map((item, index) => {
          {
            return (
              <div
                onClick={() =>
                  handleChosePlace({
                    id: item.id!,
                    name: `${item.name}-${item.address}`,
                  })
                }
                key={index}
                className="flex min-h-[48px] gap-1 items-center cursor-pointer"
              >
                <div
                  className={
                    "w-3 h-3 rounded-[50%] " +
                    (place?.id === item.id! ? "bg-bg_01A63E" : "")
                  }
                ></div>
                <div className="text-_14 max-w-[80%] text-GreyPrimary ml-[6px] line-clamp-2">
                  {item.name + "-" + item.address}
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
});

export default FilterPlaceBox;
