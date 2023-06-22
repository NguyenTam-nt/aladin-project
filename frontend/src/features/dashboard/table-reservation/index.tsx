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
import { useState } from "react";
import { useModalContext } from "@contexts/hooks/modal";
import { DiglogComfirmDelete } from "../components/DiglogComfirmDelete";
import ModalFeedbackReservation from "./component/ModalFeedbackReservation";
import ModalConfirm from "./component/ModalConfirm";

const ManageTableReserVation = () => {
  const { t } = useTranslation();
  const { setElementModal } = useModalContext();
  const { refCheckboxAll, refCheckboxList, handleCheckAll, handleCheckedItem } =
    useHandleCheckbox([1, 2, 3, 4, 5, 6]);
  const [isReply, setReply] = useState<boolean | null>(null);
  const [place, setPlace] = useState<string | null>(null);
  const handleDeleteModal = () => {
    setElementModal(
      <DiglogComfirmDelete message="common._message_delete_reservation" />
    );
  };
  const handleFeadbackCustommer = () => {
    setElementModal(<ModalFeedbackReservation data={true} />);
  };
  const handleShowModalConfirm = () => {
    setElementModal(<ModalConfirm onClick={() => {}} />);
  };
  return (
    <div>
      {place ? (
        <h3 className="title-24 font-bold font-IBM_Plex_Sans">{place}</h3>
      ) : (
        <TitleOfContentManage name="tableReservation.nameTable" />
      )}
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
              onClick={handleDeleteModal}
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
              <FilterPlaceBox place={place} handleChosePlace={setPlace} />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="w-full">
          <div className="grid grid-cols-[5%_20%_15%_15%_10%_23%_12%] [&>div]:py-4 border-b text-_16 font-semibold">
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
            <div className="relative group">
              <div className="flex items-center gap-[10px] cursor-pointer justify-end">
                {t("tableReservation.tableHeader.status")}
                <ICFilterDropdown color={Colors.text_primary} />
              </div>
              <div className="absolute hidden h-0 ease-in duration-75 group-hover:block group-hover:h-[92px] shadow-sm z-20 top-full right-0 w-full bg-white">
                <div
                  onClick={() => setReply(true)}
                  className={
                    "p-5 text-sm font-normal leading-22 px-4 py-3 cursor-pointer " +
                    (isReply
                      ? "text-text_white bg-TrueBlue_500"
                      : "text-text_primary bg-white")
                  }
                >
                  đã phản hồi
                </div>
                <div
                  onClick={() => setReply(false)}
                  className={
                    "p-5 text-sm font-normal leading-22 px-4 py-3 cursor-pointer " +
                    (isReply != null && !isReply
                      ? "text-text_white bg-TrueBlue_500"
                      : "text-text_primary bg-white")
                  }
                >
                  chưa phản hồi
                </div>
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
            <div onClick={handleFeadbackCustommer}>2</div>
            <div onClick={handleFeadbackCustommer}>3</div>
            <div onClick={handleFeadbackCustommer} className="">
              4
            </div>
            <div onClick={handleFeadbackCustommer} className="text-center">
              5
            </div>
            <div onClick={handleFeadbackCustommer} className="text-center">
              6
            </div>
            <div
              className="flex items-center justify-end gap-1"
              onClick={handleShowModalConfirm}
            >
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
