import CalendarIcont from "@assets/icons/CalendarIcont";
import { ICArowDown } from "@assets/icons/ICArowDown";
import { ICDeleteTrashLight } from "@assets/icons/ICDeleteTrashLight";
import MagnifyingGlass from "@assets/icons/MagnifyingGlass";
import TitleOfContentManage from "@components/TitleOfContentManage";
import { Colors } from "@constants/color";
import { useTranslation } from "react-i18next";
import { Button } from "../components/Button";
import { useClickOutItem } from "@hooks/useClickOutItem";
import { Checkbox } from "../components/Checkbox";
import { useHandleCheckbox } from "../category-product/useHandleCheckbox";
import { ICFilterDropdown } from "@assets/icons/ICFilterDropdown";
import FilterPlaceBox from "./component/FilterPlaceBox";
import FilterByTime from "./component/FilterByTime";

const ManageTableReserVation = () => {
  const { t } = useTranslation();
  const { ref, isShow, handleToggleItem } = useClickOutItem();
  const { refCheckboxAll, refCheckboxList, handleCheckAll, handleCheckedItem } =
    useHandleCheckbox([1, 2, 3, 4, 5, 6]);
  return (
    <div>
      <TitleOfContentManage name="news.listNew" />
      <div className="mt-10 pb-6">
        <div className="flex items-center gap-6 justify-between">
          <div className="w-[800px] relative">
            <input
              type="text"
              className="w-full border border-[#CFCFCF] bg-transparent py-3 pl-12  font-normal text-sm leading-22"
              placeholder={t("common.searchInput") as string}
            />
            <div className="absolute left-5 top-2/4 -translate-y-2/4">
              <MagnifyingGlass color="#A1A0A3" />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Button
              //   onClick={handleAddNew}
              text="common.delete"
              className="max-w-[177px] whitespace-nowrap text-text_EA222A border-text_EA222A"
              imageLeft={
                <span className="mr-2">
                  <ICDeleteTrashLight />
                </span>
              }
              color={"empty"}
            />
            <div className="flex gap-6 justify-between">
              <FilterByTime />
              <FilterPlaceBox />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="w-full">
          <div className="grid grid-cols-[5%_20%_15%_15%_10%_23%_12%] py-4 border-b text-_16 font-semibold">
            <div>
              <Checkbox onChange={handleCheckAll} ref={refCheckboxAll} />
            </div>
            <div className="">{t("tableReservation.tableHeader.fullName")}</div>
            <div>{t("tableReservation.tableHeader.phoneNumber")}</div>
            <div>{t("tableReservation.tableHeader.day")}</div>
            <div className="text-center">
              {t("tableReservation.tableHeader.hour")}
            </div>
            <div className="text-center">
              {t("tableReservation.tableHeader.place")}
            </div>
            <div>
              <div className="flex items-center gap-1 cursor-pointer justify-end">
                {t("tableReservation.tableHeader.status")}
                <ICFilterDropdown color={Colors.text_primary} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-[5%_20%_15%_15%_10%_23%_12%] py-4 border-b text-sm leading-22 font-normal">
            <div>
              <Checkbox
                onChange={(event) => handleCheckedItem(event, 1)}
                ref={(element: HTMLInputElement) => {
                  refCheckboxList.current[1] = element;
                }}
              />
            </div>
            <div>2</div>
            <div>3</div>
            <div className="">4</div>
            <div className="text-center">5</div>
            <div className="text-center">6</div>
            <div className="flex items-center justify-end gap-1">
              <div className="w-3 h-3 rounded-[50%] bg-bg_01A63E hover:bg-red_error"></div>
              <p className="text-bg_01A63E cursor-pointer">
                {t("tableReservation.noReply")}
              </p>
              {/* <p>{t("tableReservation.reply")}</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageTableReserVation;
