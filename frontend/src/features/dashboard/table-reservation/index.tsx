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
import { ICFilterDropdown } from "@assets/icons/ICFilterDropdown";
import FilterPlaceBox from "./component/FilterPlaceBox";
import FilterByTime from "./component/FilterByTime";
import { useEffect, useState } from "react";
import { useModalContext } from "@contexts/hooks/modal";
import { DiglogComfirmDelete } from "../components/DiglogComfirmDelete";
import ModalFeedbackReservation from "./component/ModalFeedbackReservation";
import ModalConfirm from "./component/ModalConfirm";
import { reservationTableSvice } from "@services/reservationTableSevice";
import type { book_table } from "@typeRules/tableReservation";
import { FomatDateYY_MM_DD } from "@constants/formatDateY_M_D";
import { useHandleCheckbox } from "../category-product/useHandleCheckbox";
import { useShowMessage } from "../components/DiglogMessage";
import type { IParams } from "@typeRules/index";

const ManageTableReserVation = () => {
  const { t } = useTranslation();
  const { setElementModal } = useModalContext();
  const [isReply, setReply] = useState<boolean | null>(null);
  const [place, setPlace] = useState<number | null>(null);
  const [filter, setFilter] = useState<{ time: string; status: string } | null>(
    {
      time: "",
      status: "",
    }
  );
  const [listRequetTable, setListRequesTable] = useState<book_table[]>([]);
  const [currentPage, setcurrentPage] = useState<number>(1);
  const [totalPage, setTotalpage] = useState<number>(1);

  const {
    refCheckboxAll,
    refCheckboxList,
    handleCheckAll,
    handleCheckedItem,
    listChecked,
    setListChecked,
  } = useHandleCheckbox(listRequetTable.map((item) => item.id!) || []);
  const { showError, showSuccess } = useShowMessage();
  const handleDeleteModal = () => {
    setElementModal(
      <DiglogComfirmDelete
        message="common._message_delete_reservation"
        onClick={handleDeleteListReserTable}
      />
    );
  };
  const handleFeadbackCustommer = (item: book_table) => {
    setElementModal(<ModalFeedbackReservation data={item} />);
  };
  const handleShowModalConfirm = () => {
    setElementModal(<ModalConfirm onClick={() => {}} />);
  };

  const getListRequesResertable = async (params: IParams) => {
    try {
      const { list, totalElement, totalElementPage } =
        await reservationTableSvice.getRequestReserTable(params);
      setListRequesTable(list);
      setTotalpage(Math.ceil(totalElementPage / 10));
    } catch (error) {
      console.log("Không lấy được danh sách yêu cầu đặt bàn.");
    }
  };
  const handleDeleteListReserTable = async () => {
    try {
      const listDataDelete = listChecked.map((item) => {
        return {
          id: item,
        };
      });
      await reservationTableSvice.deleteListReserTable(listDataDelete);
      showSuccess("adminOrderFood.notification.deleteSuccess");
      if (currentPage === 1) {
        getListRequesResertable({
          page: currentPage - 1,
          size: 20,
          date: "",
          sort: "id,desc,status=desc",
        });
      } else {
        setcurrentPage(1);
      }
      setListChecked([]);
    } catch (error) {
      showError("message.actions.error.delete_banner");
    }
  };

  useEffect(() => {
    const params = {
      page: currentPage - 1,
      size: 20,
      date: filter?.time,
      id: place,
      sort: `status,${filter?.status}`,
    };
    getListRequesResertable(params);
  }, [currentPage, filter]);

  return (
    <div>
      {/* {place ? (
        <h3 className="title-24 font-bold font-IBM_Plex_Sans">{place}</h3>
      ) : ( */}
      <TitleOfContentManage name="tableReservation.nameTable" />
      {/* )} */}
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
                  onClick={() =>
                    setFilter({ ...filter, status: "desc" } as any)
                  }
                  className={
                    "p-5 text-sm font-normal leading-22 px-4 py-3 cursor-pointer " +
                    (filter?.status === "desc"
                      ? "text-text_white bg-TrueBlue_500"
                      : "text-text_primary bg-white")
                  }
                >
                  đã phản hồi
                </div>
                <div
                  onClick={() => setFilter({ ...filter, status: "asc" } as any)}
                  className={
                    "p-5 text-sm font-normal leading-22 px-4 py-3 cursor-pointer " +
                    (filter?.status === "asc"
                      ? "text-text_white bg-TrueBlue_500"
                      : "text-text_primary bg-white")
                  }
                >
                  chưa phản hồi
                </div>
              </div>
            </div>
          </div>
          {listRequetTable.map((item, index) => {
            return (
              <div
                key={index}
                className="grid grid-cols-[5%_20%_15%_15%_10%_23%_12%] py-4 border-b text-sm leading-22 font-normal"
              >
                <div>
                  <Checkbox
                    onChange={(event) => handleCheckedItem(event, index)}
                    ref={(element: HTMLInputElement) => {
                      refCheckboxList.current[index] = element;
                    }}
                  />
                </div>
                <div onClick={() => handleFeadbackCustommer(item)}>
                  {item.name}
                </div>
                <div onClick={() => handleFeadbackCustommer(item)}>
                  {item.phone}
                </div>
                <div onClick={() => handleFeadbackCustommer(item)} className="">
                  {FomatDateYY_MM_DD(item.chooseDate)}
                </div>
                <div
                  onClick={() => handleFeadbackCustommer(item)}
                  className="text-center"
                >
                  {FomatDateYY_MM_DD(item.chooseDate, true)}
                </div>
                <div
                  onClick={() => handleFeadbackCustommer(item)}
                  className="text-center"
                >
                  {item.chooseInfrastructure}
                </div>
                <div
                  className="flex items-center justify-end gap-1"
                  onClick={handleShowModalConfirm}
                >
                  <div
                    className={
                      "w-3 h-3 rounded-[50%] " +
                      (item.status ? "bg-bg_01A63E" : "bg-red_error")
                    }
                  ></div>
                  {item.status ? (
                    <p className="text-bg_01A63E cursor-pointer">
                      {t("tableReservation.reply")}
                    </p>
                  ) : (
                    <p className="text-red_error cursor-pointer">
                      {t("tableReservation.noReply")}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ManageTableReserVation;
