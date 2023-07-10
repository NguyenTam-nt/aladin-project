import { ICArowDown } from "@assets/icons/ICArowDown";
import { Colors } from "@constants/color";
import { Button } from "@features/dashboard/components/Button";
import { useClickOutItem } from "@hooks/useClickOutItem";
import PlaceService from "@services/PlaceService";
import type { PlaceSelectType } from "@typeRules/place";
import { memo, useEffect, useState } from "react";
type PropsItem = { id: number; name: string } | null;

interface Props {
  handleChosePlace: (value: PropsItem) => void;
  place: PropsItem;
}
const FilterPlaceBox = memo(({ handleChosePlace, place }: Props) => {
  const { ref, isShow, handleToggleItem } = useClickOutItem();
  const [listPlaces, setListPlace] = useState<PlaceSelectType[]>([]);
  const getListPlace = async () => {
    try {
      const list = await PlaceService.get_select();
      setListPlace(list);
    } catch (error) {}
  };
  useEffect(() => {
    getListPlace();
  }, []);
  return (
    <div ref={ref} className="relative">
      <Button
        onClick={handleToggleItem}
        text="common.filter_by_place"
        className="max-w-[120px] !text-_12 xl:!text-_14 xl:max-w-[177px] whitespace-nowrap"
        image={
          <span className="ml-2">
            <ICArowDown color={Colors.TrueBlue500} />
          </span>
        }
        color={"empty"}
      />

      <div
        className={
          "absolute top-[105%] right-0 w-[400px] max-w-[90vw] bg-white overflow-y-auto list-facilities shadow-sm px-5 z-[9] " +
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
                    name: item.name,
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
                  {item.name}
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
